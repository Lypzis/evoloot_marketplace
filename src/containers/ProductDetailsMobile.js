import React, {
  useContext,
  useEffect,
  useCallback,
  useReducer,
  useState,
} from 'react';
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
import QuantityInput from '../components/QuantityInput';

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
      return currentProductState;
  }
};

const ProductDetailsMobile = props => {
  const { handle } = useParams();
  const history = useHistory();
  const clientContext = useContext(ClientContext);
  const dispatch = useDispatch();
  const checkout = useSelector(state => state.checkout);
  const [numberOfSlides, setNumberOfSlides] = useState(4);

  const [productChosen, dispatchProduct] = useReducer(productReducer);

  /**
   * Retrieve related products based on the type of
   * the current displayed product.
   * - Takes care to not retrieve the same product.
   * @returns array of products.
   */
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

  /**
   * Saves a viewed product to the local storage
   * if it isn't there already.
   * - Default of saved products is 10.
   * @param {Object} product
   * @returns null
   */
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

  /**
   * Retrieves viewed products from local storage.
   * - Does not retrieve the current one being displayed.
   * @param {Object} currentProduct
   * @returns
   */
  const retrieveViewed = currentProduct => {
    const viewed = localStorage.getItem('viewed');

    const viewedConverted = JSON.parse(viewed);

    return viewedConverted.filter(
      product => product.handle !== currentProduct.handle
    );
  };

  /**
   * Get a product by its handle, which will be the same as the page param.
   */
  const getProduct = useCallback(async () => {
    try {
      let productSelected = {};

      // TO-DO: rewrite this using GraphQl query
      for (const collection of clientContext.collections) {
        for (const product of collection.products) {
          if (product.handle === handle) {
            productSelected = product;
            break;
          }
        }
      }

      // Doesn't work
      // const product = await clientContext.client.product.fetchByHandle(handle);

      if (!productSelected) {
        throw new Error('No product with that handle');
      }

      saveViewed(productSelected);
      const viewed = retrieveViewed(productSelected);

      let imageSrc, imageId;

      if (productSelected.variants.length > 1) {
        imageSrc = productSelected.variants[0].image.src;
        imageId = productSelected.variants[0].image.id;
      } else {
        imageSrc = productSelected.images[0].src;
        imageId = productSelected.images[0].id;
      }

      const relatedProducts = retrieveRelatedProducts(productSelected);

      dispatchProduct({
        type: 'INITIALIZE',
        product: productSelected,
        quantity: 1,
        imageSrc,
        imageId,
        variant: productSelected.variants[0],
        relatedProducts,
        viewed,
      });

      goToTop();
    } catch (err) {
      // console.error('Error fetching product:', err.message);
      history.replace('/*');
    }
  }, [handle, history, clientContext, retrieveRelatedProducts]);

  /**
   * Sets a new main image from the product to display.
   * @param {String} imageId
   * @param {String} imageSrc
   * @param {Number} index
   */
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

  /**
   * Sets a variant selection.
   * @param {Event} event
   */
  const setVariantSelected = event => {
    const variant = JSON.parse(event.target.value);

    dispatchProduct({
      type: 'SET_SELECTION_WITH_VARIANT',
      imageSrc: variant.image.src,
      imageId: variant.image.id,
      variant,
    });
  };

  /**
   * Render products images as side thumbnails.
   * - If product has variants, their image will be set.
   * - If product has no variants, its images will be set.
   * @returns Thumbnail block.
   */
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

  /**
   * Render product variants names as options.
   * @returns option block.
   */
  const renderVariants = () => {
    return productChosen.product.variants.map(variant => (
      <option key={variant.id} value={JSON.stringify(variant)}>
        {variant.title}
      </option>
    ));
  };

  /**
   * Updates the quantity value.
   * @param {Number} quantity
   */
  const updateQuantity = quantity => {
    dispatchProduct({
      type: 'SET_QUANTITY',
      quantity,
    });
  };

  /**
   * Adds the current displayed product to cart.
   */
  const addToCart = () => {
    const variant = productChosen.variant;

    const title =
      productChosen.product.variants.length > 1
        ? `${productChosen.product.title} - ${productChosen.variant.title}`
        : productChosen.product.title;

    const quantity = productChosen.quantity;

    const handle = productChosen.product.handle;

    if (
      checkout.lineItems.findIndex(
        productVariant => productVariant.id === variant.id
      ) !== -1
    )
      dispatch(updateProductFromCheckout(variant, quantity));
    else dispatch(addProductToCheckout(variant, title, quantity, handle));
  };

  const changeNumberOfSlides = useCallback(() => {
    if (window.innerWidth <= 600) setNumberOfSlides(2);
    else if (window.innerWidth <= 800) setNumberOfSlides(3);
    else setNumberOfSlides(4);
  }, []);

  useEffect(() => {
    changeNumberOfSlides();

    window.addEventListener('resize', changeNumberOfSlides);

    return () => window.removeEventListener('resize', changeNumberOfSlides);
  }, [changeNumberOfSlides]);

  useEffect(() => {
    if (clientContext.collections) getProduct();
  }, [clientContext.collections, getProduct]);

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
            <div className='product__image'>
              <figure className='product__image-container'>
                <ReactImageMagnify
                  imageClassName='product__image '
                  enlargedImageContainerClassName='product__image '
                  enlargedImagePosition='over'
                  {...{
                    smallImage: {
                      alt: productChosen.product.images[0].altText
                        ? productChosen.product.images[0].altText
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

              <ul className='product__image-variant-list product__image-variant-list--mobile'>
                {renderThumbnails()}
              </ul>

              {/* TO-DO the product card should probably be here */}

              <Description
                description={productChosen.product.descriptionHtml}
                isThereADescription={
                  productChosen.product.description.trim() !== ''
                }
              />

              {/* TO-DO needs to be a standalone component */}
              <div className='card product__card product__card--mobile'>
                <div className='card__details'>
                  <div className='input__container'>
                    <p className='paragraph paragraph--capitalized'>
                      Availability:{' '}
                      {productChosen.variant.available
                        ? 'in stock'
                        : 'out of stock'}
                    </p>
                  </div>
                  {productChosen.product.variants.length > 1 && (
                    <div className='input__container'>
                      <p className='paragraph'>Variant: </p>
                      <select
                        className='input input__select  input__select--collection'
                        onChange={setVariantSelected}
                      >
                        {renderVariants()}
                      </select>
                    </div>
                  )}

                  <QuantityInput
                    productQuantity={productChosen.quantity}
                    setQuantity={updateQuantity}
                  />

                  <span className='navbar-line'></span>

                  <div className='product__price'>
                    <p className='paragraph'>
                      $
                      {(
                        productChosen.variant.price *
                        productChosen.quantity *
                        clientContext.currencyRate.value
                      ).toFixed(2)}
                    </p>
                  </div>

                  <button
                    className='button button__black button__black--card-big'
                    onClick={addToCart}
                    disabled={
                      productChosen.quantity === 0 ||
                      !productChosen.variant.available
                    }
                  >
                    {productChosen.quantity === 0 ||
                    !productChosen.variant.available ? (
                      <div className='button__icon-container button__icon-container--big'>
                        <p className='paragraph card__price card__price--big'>
                          Sold Out
                        </p>
                      </div>
                    ) : (
                      <div className='button__icon-container button__icon-container--big'>
                        <svg className='button__icon button__icon--card-big '>
                          <use xlinkHref={`${sprite}#icon-cart`}></use>
                        </svg>
                        <p className='paragraph card__price card__price--big'>
                          Add To Cart
                        </p>
                      </div>
                    )}
                  </button>
                </div>
              </div>

              <span className='navbar-line big-margin-top'></span>

              {/* HERE */}
              <Carousel
                header={
                  <h3 className='heading-tertiary heading-tertiary--dark no-margin'>
                    You may also like:
                  </h3>
                }
                products={productChosen.relatedProducts}
                naturalSlideWidth={100}
                naturalSlideHeight={window.innerWidth <= 800 ? 130 : 145}
                visibleSlides={numberOfSlides}
                step={numberOfSlides}
                isPlaying={false}
                productDetails={true}
              />

              <span className='navbar-line big-margin-top'></span>

              {/* HERE */}
              <Carousel
                header={
                  <h3 className='heading-tertiary heading-tertiary--dark no-margin'>
                    Recently Viewed:
                  </h3>
                }
                products={productChosen.viewed}
                naturalSlideWidth={100}
                naturalSlideHeight={window.innerWidth <= 800 ? 130 : 145}
                visibleSlides={numberOfSlides}
                step={numberOfSlides}
                isPlaying={false}
                productDetails={true}
              />
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default ProductDetailsMobile;
