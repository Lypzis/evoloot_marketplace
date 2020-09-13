import React, { useContext, useEffect, useCallback, useReducer } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ReactImageMagnify from 'react-image-magnify';
import { goToTop } from 'react-scrollable-anchor';
import { useDispatch, useSelector } from 'react-redux';

import { ClientContext } from '../context/clientContext';
import sprite from '../assets/icons/sprite.svg';
import Layout from '../hoc/Layout';
import Thumbnail from '../components/Thumbnail';
import Description from '../components/Description';
import Carousel from '../components/Carousel';
import {
	addProductToCheckout,
	updateProductFromCheckout,
} from '../store/actions/checkout';

const productReducer = (currentProductState, action) => {
	switch (action.type) {
		case 'INITIALIZE':
			return {
				product: action.product,
				quantity: action.quantity,
				imageSrc: action.imageSrc,
				imageId: action.imageId,
				variant: action.variant,
				relatedProducts: action.relatedProducts,
				viewed: action.viewed,
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
	const dispatch = useDispatch();
	const checkout = useSelector(state => state.checkout);

	const [productChosen, dispatchProduct] = useReducer(productReducer);

	const retrieveRelatedProducts = useCallback(
		currentProduct => {
			let products = [];

			clientContext.collections.forEach(collection => {
				products = [...products, ...collection.products].filter(
					product =>
						product.productType === currentProduct.productType &&
						product.handle !== handle
				);
			});

			return products;
		},
		[handle, clientContext]
	);

	const saveViewed = product => {
		const viewed = localStorage.getItem('viewed');

		if (!viewed) {
			localStorage.setItem('viewed', JSON.stringify([product]));
			return;
		}

		const convertedViewed = JSON.parse(viewed);

		const newViewed = convertedViewed.slice(0, 10);

		const alreadyAdded = newViewed.find(
			addedProduct => addedProduct.handle === product.handle
		);

		if (alreadyAdded === undefined) newViewed.unshift(product);

		localStorage.setItem('viewed', JSON.stringify(newViewed));
	};

	const retrieveViewed = currentProduct => {
		const viewed = localStorage.getItem('viewed');

		const viewedConverted = JSON.parse(viewed);

		return viewedConverted.filter(
			product => product.handle !== currentProduct.handle
		);
	};

	const getProduct = useCallback(async () => {
		try {
			const product = await clientContext.client.product.fetchByHandle(
				handle
			);

			saveViewed(product);
			const viewed = retrieveViewed(product);

			let imageSrc, imageId;

			if (product.variants.length > 1) {
				imageSrc = product.variants[0].image.src;
				imageId = product.variants[0].image.id;
			} else {
				imageSrc = product.images[0].src;
				imageId = product.images[0].id;
			}

			const relatedProducts = retrieveRelatedProducts(product);

			dispatchProduct({
				type: 'INITIALIZE',
				product,
				quantity: 1,
				imageSrc,
				imageId,
				variant: product.variants[0],
				relatedProducts,
				viewed,
			});

			goToTop();
		} catch (err) {
			// console.log(err);
			history.replace('/*');
		}
	}, [handle, history, clientContext, retrieveRelatedProducts]);

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

	const addFromTextInput = event => {
		validateNumber(event.target.value) &&
			dispatchProduct({
				type: 'SET_QUANTITY',
				quantity: Math.floor(event.target.value) * 1,
			});
	};

	const validateNumber = number => {
		if (number.trim() === '') return true;

		if (isNaN(number)) return false;

		if (number.trim() <= 0) return false;

		return true;
	};

	const addToCart = () => {
		const variant = productChosen.variant;

		const title =
			productChosen.product.variants.length > 1
				? `${productChosen.product.title} - ${productChosen.variant.title}`
				: productChosen.product.title;

		const quantity = productChosen.quantity;

		console.log('added');

		if (
			checkout.lineItems.findIndex(
				productVariant => productVariant.id === variant.id
			) !== -1
		)
			dispatch(updateProductFromCheckout(variant, quantity));
		else dispatch(addProductToCheckout(variant, title, quantity));
	};

	useEffect(() => {
		if (clientContext.collections) getProduct();
	}, [clientContext, getProduct]);

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
							<h3 className='heading-tertiary heading-tertiary--dark small-margin-bottom'>
								Related:
							</h3>
							<Carousel
								products={productChosen.relatedProducts}
							/>

							<span className='navbar-line big-margin-top'></span>
							<h3 className='heading-tertiary heading-tertiary--dark small-margin-bottom'>
								Recently Viewed:
							</h3>
							<Carousel products={productChosen.viewed} />
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
											onChange={addFromTextInput}
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

								<button
									className='button button__white button__white--card-big'
									onClick={addToCart}
									disabled={productChosen.quantity === 0}>
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
