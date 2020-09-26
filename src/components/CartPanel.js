import React, { Fragment, memo, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import sprite from '../assets/icons/sprite.svg';
import LineProducts from './LineProducts';
import BluredBackground from './BluredBackground';
import { ClientContext } from '../context/clientContext';
import { removeAllProductsFromCheckout } from '../store/actions/checkout';

const CartPanel = props => {
	const checkout = useSelector(state => state.checkout);
	const dispatch = useDispatch();
	const clientContext = useContext(ClientContext);
	const history = useHistory();

	const createQuickCheckout = async () => {
		try {
			const lineItems = checkout.lineItems.map(product => {
				return {
					variantId: product.id,
					quantity: product.quantity,
				};
			});

			const newCheckout = await clientContext.client.checkout.create();

			const checkoutWithProducts = await clientContext.client.checkout.addLineItems(
				newCheckout.id,
				lineItems
			);

			window.open(checkoutWithProducts.webUrl);
			dispatch(removeAllProductsFromCheckout());
		} catch (err) {
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

				{/* TO-DO: WHEN CLICKED, ALSO CLOSE PANEL */}
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
									CAD${checkout.totalPrice.toFixed(2)}
								</p>
							</div>
						</div>

						<button
							className='button button__white button__white--card-big'
							disabled={checkout.totalPrice === 0}
							onClick={createQuickCheckout}>
							<p className='paragraph card__price card__price--big cart__button-text'>
								checkout
							</p>
						</button>
						<button
							className='button button__white button__white--card-big small-margin-top'
							onClick={() => history.push('/cart')}>
							<p className='paragraph card__price card__price--big cart__button-text'>
								view cart
							</p>
						</button>
						<p>&emsp;</p>
					</div>
				</div>
			</Fragment>
		);

	return null;
};

export default memo(CartPanel);
