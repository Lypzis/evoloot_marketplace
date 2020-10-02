import React, { useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Layout from '../hoc/Layout';
import LineProducts from '../components/LineProducts';
import { ClientContext } from '../context/clientContext';
import { removeAllProductsFromCheckout } from '../store/actions/checkout';
import { updateCheckoutShippingAddress, updateCheckoutEmail } from '../graphql';
import axiosInstace from '../axios';

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

	const createCheckout = async () => {
		try {
			const lineItems = checkout.lineItems.map(product => {
				return {
					variantId: product.id,
					quantity: product.quantity,
				};
			});

			const newCheckout = await clientContext.client.checkout.create();

			const input = {
				customAttributes: [
					{ key: 'note', value: `Customer Note: ${textAreaValue}` },
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

				console.log(addressWithoutId);

				for (let key in user.mainAddress)
					if (key !== 'id')
						addressWithoutId[key] = user.mainAddress[key];

				const checkoutWithAddress = await axiosInstace.post(
					'/api/graphql.json',
					updateCheckoutShippingAddress(
						addressWithoutId,
						newCheckout.id
					)
				);

				const errors =
					checkoutWithAddress.data.data
						.checkoutShippingAddressUpdateV2.checkoutUserErrors;

				if (errors.length > 0) throw new Error(errors[0].message);
			}

			const checkoutWithProducts = await clientContext.client.checkout.addLineItems(
				newCheckout.id,
				lineItems
			);

			window.open(checkoutWithProducts.webUrl);
			dispatch(removeAllProductsFromCheckout());
			history.push('/');
		} catch (err) {
			console.log('Something terrible happened ', err);
		}
	};

	return (
		<Layout>
			<div className='cart--page'>
				<h2 className='heading-secondary heading-secondary--dark'>
					My Cart
				</h2>
				<LineProducts big={true} />

				{/* NOTE: THIS IS USELESS RIGHT NOW */}
				<p className='paragraph paragraph--black'>
					Additional Comments:
				</p>
				<textarea
					className='input input__text-area'
					name='notes'
					id='notes'
					cols='50'
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
							CAD${checkout.totalPrice.toFixed(2)}
						</p>
					</div>
				</div>

				<button
					className='button button__white button__white--card-big'
					disabled={checkout.totalPrice === 0}
					onClick={createCheckout}>
					<p className='paragraph card__price card__price--big cart__button-text'>
						proceed to checkout
					</p>
				</button>
			</div>
		</Layout>
	);
};

export default Cart;
