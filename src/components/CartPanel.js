import React, { Fragment, memo } from 'react';
import { useSelector } from 'react-redux';

import sprite from '../assets/icons/sprite.svg';
import LineProducts from './LineProducts';

const CartPanel = props => {
	const checkout = useSelector(state => state.checkout);

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

				<div className='cart'>
					<div className='cart__panel'>
						{/* INSTEAD OF BUTTON, USE INPUT AND LABEL HERE,
                SO THIS FUNCTIONALITY WILL ONLY NEED CSS :DDDD */}

						{/* <button
					className='button button__small-circle'
					onClick={() => console.log('close')}>
					<svg className='button__icon'>
						<use xlinkHref={`${sprite}#icon-cross`}></use>
					</svg>
				</button> */}

						<h3 className='heading-tertiary heading-tertiary no-margin'>
							Shopping Cart:
						</h3>

						{/* LIST OF LINE PRODUCTS */}
						<LineProducts />

						<span className='navbar-line small-margin-top'></span>

						<div className='cart__total'>
							<p className='paragraph'>Total: </p>
							<div className='product__price'>
								<p className='paragraph'>
									CAD${checkout.totalPrice.toFixed(2)}
								</p>
							</div>
						</div>

						<button className='button button__white button__white--card-big'>
							<p className='paragraph card__price card__price--big cart__button-text'>
								checkout
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
