import React, { memo } from 'react';
import { useSelector } from 'react-redux';

import sprite from '../assets/icons/sprite.svg';

const LineProducts = props => {
	const checkout = useSelector(state => state.checkout);

	return (
		<ul>
			{checkout.lineItems.length > 0 &&
				checkout.lineItems.map(item => (
					<li className='card card--checkout'>
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
							<h3 className='heading-tertiary card__title card__title--checkout'>
								{item.productTitle}
							</h3>

							<p className='paragraph'>
								{item.quantity}x CAD${item.price}
							</p>
						</div>

						<button
							className='button button__small-circle button__small-circle--checkout'
							onClick={() => console.log('close')}>
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
