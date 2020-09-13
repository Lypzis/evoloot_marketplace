import React, { memo } from 'react';

const Thumbnail = props => {
	const setImage = () => {
		if (props.isVariant)
			props.setImage(
				props.product.variants[props.index].image.id,
				props.product.variants[props.index].image.src,
				props.index
			);
		else
			props.setImage(
				props.product.images[props.index].id,
				props.product.images[props.index].src
			);
	};

	return (
		<li key={props.image.src} className='product__image-variant-list-item'>
			<input
				readOnly
				className='input__radio-image'
				checked={props.currentSelection === props.image.id}
				value={props.image.id}
				id={props.image.id}
				name='image'
				type='radio'
			/>
			<label
				className={
					props.currentSelection === props.image.id
						? 'button button__white  button__white--image-active'
						: 'button button__white button__white--image'
				}
				htmlFor={props.image.id}
				onClick={setImage}>
				<img
					className='product__image product__image--variant'
					src={props.image.src}
					alt={
						props.image.altText
							? props.image.altText
							: props.product.title
					}
				/>
			</label>
		</li>
	);
};

export default memo(Thumbnail);
