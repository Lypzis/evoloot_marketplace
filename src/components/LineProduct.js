import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import sprite from '../assets/icons/sprite.svg';
import {
	removeProductFromCheckout,
	updateProductFromCheckout,
} from '../store/actions/checkout';
import QuantityInput from './QuantityInput';

const LineProduct = props => {
	const dispatch = useDispatch();
	const { product } = props;

	const cardCheckout = props.big
		? 'card card--checkout card--checkout-big'
		: 'card card--checkout';

	const cardCheckoutImageBox = props.big
		? 'card__image-box card__image-box--checkout card__image-box--checkout-big'
		: 'card__image-box card__image-box--checkout';

	const cardCheckoutRemoveButton = props.big
		? 'button button__small-circle button__big-circle'
		: 'button button__small-circle button__small-circle--checkout';

	const cardCheckoutRemoveButtonIcon = props.big
		? 'button__icon button__icon--card-cart-big'
		: 'button__icon button__icon--card';

	const cardCheckoutDetails = props.big
		? 'card__checkout-details card__checkout-details--big'
		: 'card__checkout-details';

	const cardTitle = props.big
		? 'heading-tertiary card__title card__title--big'
		: 'heading-tertiary card__title card__title--checkout';

	const removeProduct = () => {
		dispatch(removeProductFromCheckout(product));
	};

	const updateQuantity = quantity => {
		dispatch(updateProductFromCheckout(product, quantity, true));
	};

	return (
		<li key={product.id} className={cardCheckout}>
			<div className={cardCheckoutImageBox}>
				<img
					className='card__image'
					src={product.image.src}
					alt={
						product.image.altText
							? product.image.altText
							: product.productTitle
					}
				/>
			</div>

			<div className={cardCheckoutDetails}>
				<Link className='card__link' to={`/product/${product.handle}`}>
					<h3 className={cardTitle}>{product.productTitle}</h3>
				</Link>

				<QuantityInput
					productQuantity={product.quantity}
					setQuantity={updateQuantity}
					small={props.small}
					big={props.big}
				/>

				<p className='paragraph'>
					{product.quantity}x CAD${product.price}
				</p>
			</div>

			<button
				className={cardCheckoutRemoveButton}
				onClick={removeProduct}>
				<svg className={cardCheckoutRemoveButtonIcon}>
					<use xlinkHref={`${sprite}#icon-cross`}></use>
				</svg>
			</button>
		</li>
	);
};

export default LineProduct;
