import React, { useContext, useEffect, useCallback, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ReactImageMagnify from 'react-image-magnify';

import { ClientContext } from '../context/clientContext';
import sprite from '../assets/icons/sprite.svg';
import Layout from '../hoc/Layout';
import Thumbnail from '../components/Thumbnail';
import Description from '../components/Description';

const ProductDetails = props => {
	const { handle } = useParams();
	const history = useHistory();
	const clientContext = useContext(ClientContext);

	// TO-DO turn this garbase into a local reducer.
	const [product, setProduct] = useState();
	const [displayImage, setDisplayImage] = useState();
	const [currentSelection, setCurrentSelection] = useState();
	const [variant, setVariant] = useState();
	const [quantity, setQuantity] = useState(1);

	const getProduct = useCallback(async () => {
		try {
			const product = await clientContext.client.product.fetchByHandle(
				handle
			);

			if (product.variants.length > 1) {
				setDisplayImage(product.variants[0].image.src);
				setCurrentSelection(product.variants[0].image.id);
			} else {
				setDisplayImage(product.images[0].src);
				setCurrentSelection(product.images[0].id);
			}

			setVariant(product.variants[0]);
			setProduct(product);
		} catch (err) {
			history.replace('/*');
		}
	}, [handle, history, clientContext]);

	const setImageSelected = (id, src, index = 0) => {
		setCurrentSelection(id);
		setDisplayImage(src);

		if (product.variants.length > 1) setVariant(product.variants[index]);
	};

	const setVariantSelected = event => {
		const variant = JSON.parse(event.target.value);

		setCurrentSelection(variant.image.id);
		setDisplayImage(variant.image.src);
		setVariant(variant);
	};

	const renderThumbnails = () => {
		if (product.variants.length > 1)
			return product.variants.map((variant, index) => (
				<Thumbnail
					key={index}
					isVariant={true}
					product={product}
					image={variant.image}
					index={index}
					currentSelection={currentSelection}
					setImage={setImageSelected}
				/>
			));

		return product.images.map((image, index) => (
			<Thumbnail
				key={index}
				isVariant={false}
				product={product}
				image={image}
				index={index}
				currentSelection={currentSelection}
				setImage={setImageSelected}
			/>
		));
	};

	const renderVariants = () => {
		return product.variants.map(variant => (
			<option key={variant.id} value={JSON.stringify(variant)}>
				{variant.title}
			</option>
		));
	};

	const addToQuantity = () => {
		setQuantity(prevState => ++prevState);
	};
	const subtractFromQuantity = () => {
		setQuantity(prevState => {
			if (prevState > 1) return --prevState;

			return prevState;
		});
	};

	const validateNumber = number => {
		if (number.trim() === '') return true;

		if (isNaN(number)) return false;

		if (number.trim() <= 0) return false;

		return true;
	};

	useEffect(() => {
		getProduct();
	}, [getProduct]);

	return (
		<Layout>
			{product && (
				<section className='product'>
					<h2 className='heading-secondary heading-secondary--dark product__title'>
						{product.variants.length > 1
							? `${product.title} - ${variant.title}`
							: product.title}
					</h2>
					<div className='product__details'>
						<ul className='product__image-variant-list'>
							{renderThumbnails()}
						</ul>
						<div className='product__image'>
							<figure className='product__image-container'>
								<ReactImageMagnify
									imageClassName='product__image '
									enlargedImageContainerClassName='product__image '
									enlargedImagePosition='over'
									{...{
										smallImage: {
											alt: product.images[0].altText
												? product.images[0].altText
												: product.title,
											isFluidWidth: true,
											src: displayImage,
										},
										largeImage: {
											src: displayImage,
											width: 900, // HERE ???
											height: 900,
										},
									}}
								/>
							</figure>

							<Description
								description={product.descriptionHtml}
							/>
						</div>
						<div className='card product__card'>
							<div className='card__details'>
								<div className='input__container'>
									<p className='paragraph'>
										Availability:{' '}
										{variant.available
											? 'in stock'
											: 'out of stock'}
									</p>
								</div>
								{product.variants.length > 1 && (
									<div className='input__container'>
										<p className='paragraph'>Color: </p>
										<select
											className='input input__select'
											onChange={setVariantSelected}>
											{renderVariants()}
										</select>
									</div>
								)}

								<div className='input__container'>
									<p className='paragraph'>Quantity:</p>

									<div className='input__quantity-buttons'>
										<button
											className='button input input__quantity input__quantity--left'
											onClick={subtractFromQuantity}>
											<p className='paragraph'>-</p>
										</button>
										<input
											className='input input__quantity'
											type='text'
											onChange={event =>
												validateNumber(
													event.target.value
												) &&
												setQuantity(event.target.value)
											}
											value={quantity}
										/>
										<button
											className='button input input__quantity input__quantity--right'
											onClick={addToQuantity}>
											<p className='paragraph'>+</p>
										</button>
									</div>
								</div>

								<span className='navbar-line'></span>

								<div className='product__price'>
									<p className='paragraph'>
										CAD${variant.price}
									</p>
								</div>

								<button className='button button__white button__white--card-big'>
									<div className='button__icon-container button__icon-container--big'>
										<svg className='button__icon button__icon--card-big '>
											<use
												xlinkHref={`${sprite}#icon-cart`}></use>
										</svg>
										<p className='paragraph card__price card__price--big'>
											Add To Cart
										</p>
									</div>
								</button>
							</div>
						</div>
					</div>
				</section>
			)}
		</Layout>
	);
};

export default ProductDetails;
