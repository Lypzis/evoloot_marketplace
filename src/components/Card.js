import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';

import sprite from '../assets/icons/sprite.svg';

const Card = memo(props => {
	const [isMouseOverButton, setIsMouseOverButton] = useState(false);

	return (
		<div className='card'>
			{/* to '/' temporarily, this obviously need to go to product details */}
			<Link
				className='card__link'
				to={`/product/${props.product.handle}`}>
				<div className='card__image-box'>
					<img
						className='card__image'
						src={props.product.images[0].src}
						alt={
							props.product.images[0].altText
								? props.product.images[0].altText
								: props.product.title
						}
					/>
				</div>

				<h3 className='heading-tertiary card__title'>
					{props.product.title}
				</h3>
			</Link>
			<span className='navbar-line'></span>
			<button
				className='button button__white button__white--card'
				onMouseOver={() => setIsMouseOverButton(true)}
				onMouseOut={() => setIsMouseOverButton(false)}>
				{isMouseOverButton ? (
					<div className='button__icon-container'>
						<svg className='button__icon button__icon--card'>
							<use xlinkHref={`${sprite}#icon-cart`}></use>
						</svg>
						<p className='paragraph card__price'>Add</p>
					</div>
				) : (
					<p className='paragraph card__price'>
						CAD$ {props.product.variants[0].price}
					</p>
				)}
			</button>
		</div>
	);
});

export default Card;
