import React, {
	useContext,
	useEffect,
	useCallback,
	useState,
	useReducer,
} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ReactImageMagnify from 'react-image-magnify';

import { ClientContext } from '../context/clientContext';
import sprite from '../assets/icons/sprite.svg';
import Layout from '../hoc/Layout';
import Thumbnail from '../components/Thumbnail';
import Description from '../components/Description';

const productReducer = (currentProductState, action) => {
	switch (action.type) {
		case 'INITIALIZE':
			return {
				product: action.product,
				quantity: action.quantity,
				imageSrc: action.imageSrc,
				imageId: action.imageId,
				variant: action.variant,
			};
		case 'SET_PRODUCT':
			return { ...currentProductState, product: action.product };
		case 'SET_QUANTITY':
			return { ...currentProductState, quantity: action.quantity };
		case 'SET_SELECTION':
			return {
				...currentProductState,
				imageSrc: action.imageSrc,
				imageId: action.imageId,
			};
		case 'SET_SELECTION_WITH_VARIANT':
			return {
				...currentProductState,
				imageSrc: action.imageSrc,
				imageId: action.imageId,
				variant: action.variant,
			};
		default:
			throw new Error('Something went terribly wrong! D:');
	}
};

const ProductDetails = props => {
	const { handle } = useParams();
	const history = useHistory();
	const clientContext = useContext(ClientContext);

	const [productChosen, dispatchProduct] = useReducer(productReducer);

	const getProduct = useCallback(async () => {
		try {
			const product = await clientContext.client.product.fetchByHandle(
				handle
			);

			// TO-DO save this product to localStorage, retrive all different
			// // and display as recent viewed

			// show related products

			console.log(product);

			let imageSrc, imageId;

			if (product.variants.length > 1) {
				imageSrc = product.variants[0].image.src;
				imageId = product.variants[0].image.id;
			} else {
				imageSrc = product.images[0].src;
				imageId = product.images[0].id;
			}

			dispatchProduct({
				type: 'INITIALIZE',
				product,
				quantity: 1,
				imageSrc,
				imageId,
				variant: product.variants[0],
			});
		} catch (err) {
			history.replace('/*');
		}
	}, [handle, history, clientContext]);

	const setImageSelected = (imageId, imageSrc, index = 0) => {
		if (productChosen.product.variants.length > 1)
			dispatchProduct({
				type: 'SET_SELECTION_WITH_VARIANT',
				imageSrc,
				imageId,
				variant: productChosen.product.variants[index],
			});
		else
			dispatchProduct({
				type: 'SET_SELECTION',
				imageSrc,
				imageId,
			});
	};

	const setVariantSelected = event => {
		const variant = JSON.parse(event.target.value);

		dispatchProduct({
			type: 'SET_SELECTION_WITH_VARIANT',
			imageSrc: variant.image.src,
			imageId: variant.image.id,
			variant,
		});
	};

	const renderThumbnails = () => {
		if (productChosen.product.variants.length > 1)
			return productChosen.product.variants.map((variant, index) => (
				<Thumbnail
					key={index}
					isVariant={true}
					product={productChosen.product}
					image={variant.image}
					index={index}
					currentSelection={productChosen.imageId}
					setImage={setImageSelected}
				/>
			));

		return productChosen.product.images.map((image, index) => (
			<Thumbnail
				key={index}
				isVariant={false}
				product={productChosen.product}
				image={image}
				index={index}
				currentSelection={productChosen.imageId}
				setImage={setImageSelected}
			/>
		));
	};

	const renderVariants = () => {
		return productChosen.product.variants.map(variant => (
			<option key={variant.id} value={JSON.stringify(variant)}>
				{variant.title}
			</option>
		));
	};

	const addToQuantity = () => {
		dispatchProduct({
			type: 'SET_QUANTITY',
			quantity: ++productChosen.quantity,
		});
	};
	const subtractFromQuantity = () => {
		if (productChosen.quantity > 1)
			dispatchProduct({
				type: 'SET_QUANTITY',
				quantity: --productChosen.quantity,
			});
	};

	const validateNumber = number => {
		if (number.trim() === '') return true;

		if (isNaN(number)) return false;

		if (number.trim() <= 0) return false;

		return true;
	};

	const retrieveRelatedProducts = useCallback(() => {
		if (clientContext.collections && productChosen) {
			let products = [];

			clientContext.collections.forEach(collection => {
				products = [...products, ...collection.products].filter(
					product =>
						product.productType ===
							productChosen.product.productType &&
						product.handle !== handle
				);
			});

			console.log(products);
		}
	}, [clientContext.collections, productChosen, handle]);

	useEffect(() => {
		getProduct();
	}, [getProduct]);

	useEffect(() => {
		retrieveRelatedProducts();
	}, [retrieveRelatedProducts]);

	return (
		<Layout>
			{productChosen && (
				<section className='product'>
					<h2 className='heading-secondary heading-secondary--dark product__title'>
						{productChosen.product.variants.length > 1
							? `${productChosen.product.title} - ${productChosen.variant.title}`
							: productChosen.product.title}
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
											alt: productChosen.product.images[0]
												.altText
												? productChosen.product
														.images[0].altText
												: productChosen.product.title,
											isFluidWidth: true,
											src: productChosen.imageSrc,
										},
										largeImage: {
											src: productChosen.imageSrc,
											width: 900, // HERE ???
											height: 900,
										},
									}}
								/>
							</figure>

							{/* TO-DO the product card should probably be here */}

							<Description
								description={
									productChosen.product.descriptionHtml
								}
							/>

							<span className='navbar-line'></span>
							<h3 class='heading-tertiary heading-tertiary--dark'>
								Related Products:
							</h3>

							{/* HERE */}
							{/* carousel */}
						</div>

						{/* TO-DO needs to be a standalone component */}
						<div className='card product__card'>
							<div className='card__details'>
								<div className='input__container'>
									<p className='paragraph'>
										Availability:{' '}
										{productChosen.variant.available
											? 'in stock'
											: 'out of stock'}
									</p>
								</div>
								{productChosen.product.variants.length > 1 && (
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
												dispatchProduct({
													type: 'SET_QUANTITY',
													quantity:
														event.target.value,
												})
											}
											value={productChosen.quantity}
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
										CAD$
										{(
											productChosen.variant.price *
											productChosen.quantity
										).toFixed(2)}
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
