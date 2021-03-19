import React, { useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Layout from '../hoc/Layout';
import LineProducts from '../components/LineProducts';
import { ClientContext } from '../context/clientContext';
import { removeAllProductsFromCheckout } from '../store/actions/checkout';
import { updateCheckoutShippingAddress, updateCheckoutEmail } from '../graphql';
import axiosInstace from '../axios';
import LoadingBar from '../components/LoadingBar';
import ShippingCalculator from '../components/ShippingCalculator';

const addressFields = {
	firstName: '',
	lastName: '',
	company: '',
	address1: '',
	address2: '',
	city: '',
	country: '',
	province: '',
	zip: '',
};

const Cart = props => {
	const checkout = useSelector(state => state.checkout);
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();
	const clientContext = useContext(ClientContext);
	const history = useHistory();
	const [textAreaValue, setTextAreaValue] = useState('');
	const [loading, setLoading] = useState(false);

	/**
	 * Creates a checkout.
	 * - Treat user products chosen.
	 * - Creates a new shopify checkout.
	 * - Adds custom attributes, such as, notes.
	 * - Adds user's email to checkout(if logged in).
	 * - Adds user's main address to chekout(if there is one).
	 * - Finally, adds products to checkout, opening a new tab
	 * where the user can complete or edit his checkout.
	 */
	const createCheckout = async () => {
		try {
			setLoading(true);
			const lineItems = checkout.lineItems.map(product => {
				return {
					variantId: product.id,
					quantity: product.quantity,
				};
			});

			const newCheckout = await clientContext.client.checkout.create();

			const input = {
				customAttributes: [
					{
						key: 'note',
						value:
							textAreaValue.trim() !== ''
								? `Customer Note: ${textAreaValue}`
								: '',
					},
				],
			};

			await clientContext.client.checkout.updateAttributes(
				newCheckout.id,
				input
			);

			if (user.email)
				await axiosInstace.post(
					'/api/graphql.json',
					updateCheckoutEmail(user.email, newCheckout.id)
				);

			if (user.mainAddress) {
				const addressWithoutId = { ...addressFields };

				for (let key in user.mainAddress)
					if (key !== 'id')
						addressWithoutId[key] = user.mainAddress[key];

				// const checkoutWithAddress =
				await axiosInstace.post(
					'/api/graphql.json',
					updateCheckoutShippingAddress(
						addressWithoutId,
						newCheckout.id
					)
				);

				// TO-DO: needs proper treatment, or trust that user will know
				// that his info is not getting grabbed because of wrong address information
				// const errors =
				// 	checkoutWithAddress.data.data
				// 		.checkoutShippingAddressUpdateV2.checkoutUserErrors;

				//if (errors.length > 0) throw new Error(errors[0].message);
			}

			const checkoutWithProducts = await clientContext.client.checkout.addLineItems(
				newCheckout.id,
				lineItems
			);

			window.open(checkoutWithProducts.webUrl);
			dispatch(removeAllProductsFromCheckout());
			setLoading(false);

			history.push('/');
		} catch (err) {
			setLoading(false);
			console.log('Something terrible happened ', err);
		}
	};

	return (
		<Layout>
			<div className='cart--page'>
				<div>
					<h2 className='heading-secondary heading-secondary--dark'>
						My Cart
					</h2>
					<LineProducts big={true} />
				</div>

				<div>
					<ShippingCalculator />

					{/* NOTE: THIS PLACES COMENTS SOMEWHAT INTO THE WRONG PLACE  */}
					<p className='paragraph paragraph--black'>
						Additional Comments:
					</p>

					<textarea
						className='input input__text-area'
						name='notes'
						id='notes'
						cols={window.innerWidth > 560 ? '50' : '30'}
						maxLength={300}
						value={textAreaValue}
						onChange={event => setTextAreaValue(event.target.value)}
						rows='3'></textarea>
					{/* /////////////////////////////// */}

					<span className='navbar-line small-margin-top'></span>

					<div className='cart__total'>
						<p className='paragraph paragraph--black'>Total: </p>
						<div className='product__price'>
							<p className='paragraph paragraph--black'>
								$
								{(
									checkout.totalPrice *
									clientContext.currencyRate.value
								).toFixed(2)}
							</p>
						</div>
					</div>

					{!loading ? (
						<button
							className='button button__black button__black--card-big'
							disabled={checkout.totalPrice === 0}
							onClick={createCheckout}>
							<p className='paragraph card__price card__price--big cart__button-text'>
								proceed to checkout
							</p>
						</button>
					) : (
						<LoadingBar marginTop='3rem' width={400} />
					)}
				</div>
			</div>
		</Layout>
	);
};

export default Cart;
