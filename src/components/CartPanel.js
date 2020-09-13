import React, { Fragment, memo, useEffect } from 'react';
import { useSelector } from 'react-redux';

import sprite from '../assets/icons/sprite.svg';
import LineProducts from './LineProducts';

const CartPanel = props => {
	const checkout = useSelector(state => state.checkout);

	useEffect(() => {
		console.log(checkout);
	}, [checkout]);

	return (
		<div className='cart'>
			<button className='cart__button'>CartPanel</button>
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
					<p class='paragraph card__price card__price--big cart__button-text'>
						checkout
					</p>
				</button>
				<p>&emsp;</p>
			</div>
		</div>
	);
};

export default memo(CartPanel);
