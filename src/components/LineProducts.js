import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import sprite from '../assets/icons/sprite.svg';
import { removeProductFromCheckout } from '../store/actions/checkout';

const LineProducts = props => {
	const checkout = useSelector(state => state.checkout);
	const dispatch = useDispatch();

	const removeProduct = variant => {
		dispatch(removeProductFromCheckout(variant));
	};

	return (
		<ul>
			{checkout.lineItems.length > 0 &&
				checkout.lineItems.map(item => (
					<li key={item.id} className='card card--checkout'>
						<div className='card__image-box card__image-box--checkout'>
							<img
								className='card__image'
								src={item.image.src}
								alt={
									item.image.altText
										? item.image.altText
										: item.productTitle
								}
							/>
						</div>

						<div className='card__checkout-details'>
							<Link
								className='card__link'
								to={`/product/${item.handle}`}>
								<h3 className='heading-tertiary card__title card__title--checkout'>
									{item.productTitle}
								</h3>
							</Link>
							<p className='paragraph'>
								{item.quantity}x CAD${item.price}
							</p>
						</div>

						<button
							className='button button__small-circle button__small-circle--checkout'
							onClick={() => removeProduct(item)}>
							<svg className='button__icon button__icon--card'>
								<use xlinkHref={`${sprite}#icon-cross`}></use>
							</svg>
						</button>
					</li>
				))}
		</ul>
	);
};

export default memo(LineProducts);
