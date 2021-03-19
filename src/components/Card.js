import React, { memo, useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import sprite from '../assets/icons/sprite.svg';
import {
	addProductToCheckout,
	updateProductFromCheckout,
} from '../store/actions/checkout';
import { ClientContext } from '../context/clientContext';

const Card = props => {
	const [isMouseOverButton, setIsMouseOverButton] = useState(false);
	const dispatch = useDispatch();
	const checkout = useSelector(state => state.checkout);
	const history = useHistory();
	const clientContext = useContext(ClientContext);

	/**
	 * Adds product to cart.
	 */
	const addToCart = () => {
		const variant = props.product.variants[0];

		const title = props.product.title;

		const quantity = 1;

		const handle = props.product.handle;

		if (
			checkout.lineItems.findIndex(
				productVariant => productVariant.id === variant.id
			) !== -1
		)
			dispatch(updateProductFromCheckout(variant, quantity));
		else dispatch(addProductToCheckout(variant, title, quantity, handle));
	};

	/**
	 * Redirects to the product details page.
	 */
	const goToProduct = () => {
		history.push(`/product/${props.product.handle}`);
	};

	/**
	 * On click, if product has variants, redirects to product details,
	 * else, directly adds to cart.
	 */
	const onClickHandler = () => {
		if (props.product.variants.length === 1) return addToCart();
		goToProduct();
	};

	return (
		<div
			className={[
				props.noEffect ? 'card card--raw' : 'card',
				props.productDetails
					? 'card card--raw card--raw-product-details'
					: '',
			].join(' ')}>
			<Link
				className='card__link'
				to={`/product/${props.product.handle}`}>
				<div
					className={
						props.productDetails
							? 'card__image-box card__image-box--product-details'
							: 'card__image-box'
					}>
					<img
						className={
							props.productDetails
								? 'card__image card__image--product-details'
								: 'card__image'
						}
						src={
							props.product.images[0] &&
							props.product.images[0].src
						}
						alt={
							props.product.images[0] &&
							props.product.images[0].altText
						}
					/>
				</div>

				<h3 className='heading-tertiary card__title'>
					{props.product.title}
				</h3>
			</Link>
			<span className='navbar-line'></span>
			{props.product.variants[0].available ? (
				<button
					className='button button__black button__black--card'
					onMouseOver={() => setIsMouseOverButton(true)}
					onMouseOut={() => setIsMouseOverButton(false)}
					onClick={onClickHandler}>
					{isMouseOverButton ? (
						<div className='button__icon-container'>
							<svg className='button__icon button__icon--card'>
								<use xlinkHref={`${sprite}#icon-cart`}></use>
							</svg>
							<p className='paragraph card__price'>
								{props.product.variants.length === 1
									? 'Add'
									: 'Options'}
							</p>
						</div>
					) : (
						<p className='paragraph card__price'>
							$
							{(
								props.product.variants[0].price *
								clientContext.currencyRate.value
							).toFixed(2)}
						</p>
					)}
				</button>
			) : (
				<button
					className='button button__white button__white--card'
					onMouseOver={() => setIsMouseOverButton(true)}
					onMouseOut={() => setIsMouseOverButton(false)}
					disabled
					onClick={onClickHandler}>
					<div className='button__icon-container'>
						<p className='paragraph  card__price card__price--white'>
							sold out
						</p>
					</div>
				</button>
			)}
		</div>
	);
};

export default memo(Card);
