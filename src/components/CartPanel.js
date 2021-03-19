import React, { Fragment, memo, useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import sprite from '../assets/icons/sprite.svg';
import LineProducts from './LineProducts';
import BluredBackground from './BluredBackground';
import { ClientContext } from '../context/clientContext';
import { removeAllProductsFromCheckout } from '../store/actions/checkout';
import { updateCheckoutShippingAddress, updateCheckoutEmail } from '../graphql';
import axiosInstace from '../axios';
import LoadingBar from './LoadingBar';

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

const CartPanel = props => {
	const checkout = useSelector(state => state.checkout);
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();
	const clientContext = useContext(ClientContext);
	const history = useHistory();
	const [loading, setLoading] = useState(false);

	/**
	 * Creates a checkout.
	 * - Treat user products chosen.
	 * - Creates a new shopify checkout.
	 * - Adds user's email to checkout(if logged in).
	 * - Adds user's main address to chekout(if there is one).
	 * - Finally, adds products to checkout, opening a new tab
	 * where the user can complete or edit his checkout.
	 */
	const createQuickCheckout = async () => {
		try {
			setLoading(true);
			const lineItems = checkout.lineItems.map(product => {
				return {
					variantId: product.id,
					quantity: product.quantity,
				};
			});

			const newCheckout = await clientContext.client.checkout.create();

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

				//const checkoutWithAddress =
				await axiosInstace.post(
					'/api/graphql.json',
					updateCheckoutShippingAddress(
						addressWithoutId,
						newCheckout.id
					)
				);

				// const errors =
				// 	checkoutWithAddress.data.data
				// 		.checkoutShippingAddressUpdateV2.checkoutUserErrors;

				// if (errors.length > 0) throw new Error(errors[0].message);
			}

			const checkoutWithProducts = await clientContext.client.checkout.addLineItems(
				newCheckout.id,
				lineItems
			);

			window.open(checkoutWithProducts.webUrl);
			setLoading(false);

			dispatch(removeAllProductsFromCheckout());
		} catch (err) {
			setLoading(false);
			console.log('Something terrible happened ', err);
		}
	};

	if (checkout.lineItems.length > 0)
		return (
			<Fragment>
				<input
					defaultChecked={true}
					type='checkbox'
					className='cart__checkbox'
					id='cart-toggle'
				/>

				<label
					htmlFor='cart-toggle'
					className='button button__black button__black--login cart__button'>
					<div className='button__arrow'>
						<p className='button__arrow-text'>&raquo;</p>
					</div>

					<svg className='button__icon'>
						<use xlinkHref={`${sprite}#icon-cart`}></use>
					</svg>
					<div className='button__quantity'>
						<p className='paragraph'>
							{checkout.lineItems
								.map(el => el.quantity)
								.reduce((a, b) => a + b)}
						</p>
					</div>
				</label>

				<BluredBackground for={'cart-toggle'} />

				<div className='cart'>
					<div className='cart__panel'>
						<h3 className='heading-tertiary heading-tertiary no-margin'>
							Shopping Cart:
						</h3>

						{/* LIST OF LINE PRODUCTS */}
						<LineProducts small={true} />

						<span className='navbar-line small-margin-top'></span>

						<div className='cart__total'>
							<p className='paragraph'>Total: </p>
							<div className='product__price'>
								<p className='paragraph'>
									$
									{(
										checkout.totalPrice *
										clientContext.currencyRate.value
									).toFixed(2)}
								</p>
							</div>
						</div>

						{!loading ? (
							<>
								<button
									className='button button__black button__black--card-big'
									disabled={checkout.totalPrice === 0}
									onClick={createQuickCheckout}>
									<p className='paragraph card__price card__price--big cart__button-text'>
										checkout
									</p>
								</button>
								<button
									className='button button__black button__black--card-big small-margin-top'
									onClick={() => history.push('/cart')}>
									<p className='paragraph card__price card__price--big cart__button-text'>
										view cart
									</p>
								</button>
							</>
						) : (
							<LoadingBar marginTop='3rem' />
						)}
						<p>&emsp;</p>
					</div>
				</div>
			</Fragment>
		);

	return null;
};

export default memo(CartPanel);
