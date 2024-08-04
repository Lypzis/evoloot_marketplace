import React, {
  memo,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import { Link, useLocation } from 'react-router-dom';

import 'pure-react-carousel/dist/react-carousel.es.css';

import Card from '../components/Card';
import Carousel from '../components/Carousel';

// import { getCustomerOrders } from '../graphql';
// import axiosInstance from '../axios';
import { ClientContext } from '../context/clientContext';

const Collection = props => {
  const { products } = props.collection;

  const clientContext = useContext(ClientContext);
  const { loadMoreCollectionProducts } = clientContext;
  const query = new URLSearchParams(useLocation().search);
  const queryTag = query.get('tag');

  const [displayedProducts, setDisplayedProducts] = useState(
    props.featured
      ? products.slice(0, 4).map(product => {
          return <Card key={product.id} product={product} />;
        })
      : products.map(product => {
          return <Card key={product.id} product={product} />;
        })
  );

  const [cursor, setCursor] = useState(products[0].cursor);
  const [currArrLength, setCurrArrLength] = useState(products.length);
  const [carouselHeight, setCarouselHeight] = useState(120);
  const [carouselWidth, setCarouselWidth] = useState(100);
  const [numberOfSlides, setNumberOfSlides] = useState(4);

  /**
   * Sort cards filter.
   * @param {Event} event
   */
  const sortBy = event => {
    event.preventDefault();

    let sorted;

    switch (event.target.value) {
      case 'featured':
        sorted = [...products].sort(
          (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
        );
        break;
      case 'priceLowToHigh':
        sorted = [...products].sort(
          (a, b) =>
            parseFloat(a.variants[0].price) - parseFloat(b.variants[0].price)
        );
        break;
      case 'priceHighToLow':
        sorted = [...products].sort(
          (a, b) =>
            parseFloat(b.variants[0].price) - parseFloat(a.variants[0].price)
        );
        break;
      case 'alphabeticallyAToZ':
        sorted = [...products].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'alphabeticallyZToA':
        sorted = [...products].sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'dateOldToNew':
        sorted = [...products].sort(
          (a, b) => new Date(a.publishedAt) - new Date(b.publishedAt)
        );
        break;
      case 'dateNewToOld':
        sorted = [...products].sort(
          (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
        );
        break;
      default:
        sorted = [...products].sort(
          (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
        );
    }

    renderProducts(sorted);
  };

  /**
   * Renders 'Card' blocks.
   * @param {Array} arr
   */
  const renderProducts = arr => {
    setDisplayedProducts(
      arr.map(product => {
        return <Card key={product.id} product={product} />;
      })
    );
  };

  /**
   * Loads more 20 products to the page.
   */
  const loadMoreProducts = async () => {
    const newCursor = await loadMoreCollectionProducts(
      props.collection.handle,
      `first: 20, after: "${cursor}"`
    );

    if (newCursor) {
      setCursor(newCursor.cursor);
      setCurrArrLength(newCursor.length);
    }
  };

  /**
   * Changes carousel width based on window width.
   * @returns number
   */
  const changeCarouselWidth = () =>
    setCarouselWidth(window.innerWidth <= 850 ? 110 : 100);
  /**
   * Changes carousel height based on window height.
   * @returns number
   */
  const changeCarouselHeight = () =>
    setCarouselHeight(window.innerWidth <= 850 ? 130 : 120);
  /**
   * Changes the number of slides based on window width.
   * @returns number
   */
  const changeNumberOfSlides = () => {
    if (window.innerWidth <= 600) setNumberOfSlides(2);
    else if (window.innerWidth <= 850) setNumberOfSlides(3);
    else setNumberOfSlides(4);
  };

  const adjustElementToScreenSizeChange = useCallback(() => {
    changeCarouselWidth();
    changeCarouselHeight();
    changeNumberOfSlides();
  }, []);

  const renderProductsSorted = arr => {
    const productsFormated = arr
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
      .map(product => {
        return <Card key={product.id} product={product} />;
      });

    setDisplayedProducts(productsFormated);
  };

  useEffect(() => {
    const productsFormated = products
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
      .map(product => {
        return <Card key={product.id} product={product} />;
      });

    setDisplayedProducts(productsFormated);
  }, [products, props.featured]);

  useEffect(() => {
    const filteredProducts = [];

    if (queryTag && typeof queryTag !== 'undefined') {
      for (let i = 0; i < products.length; ++i) {
        const doesItBelong = products[i].tags.findIndex(
          tag => tag === queryTag
        );

        if (doesItBelong !== -1) filteredProducts.push(products[i]);
      }

      renderProductsSorted(filteredProducts);
    } else {
      renderProductsSorted(products);
    }
  }, [queryTag, products]);

  useEffect(() => {
    adjustElementToScreenSizeChange();

    window.addEventListener('resize', adjustElementToScreenSizeChange);

    return () =>
      window.removeEventListener('resize', adjustElementToScreenSizeChange);
  }, [adjustElementToScreenSizeChange]);

  return (
    <div className='home__featured-section' key={props.collection.id}>
      <h2 className='heading-secondary heading-secondary--dark'>
        {props.collection.title}
      </h2>
      <h3 className='heading-tertiary heading-tertiary--dark'>
        {props.collection.description}
      </h3>
      {!props.featured && (
        <div className='card card--collection'>
          <div className='input__container input__container--collection'>
            <p className='paragraph'>sort by: </p>
            <select
              // input--black
              className='input input__select input__select--collection'
              onChange={sortBy}
            >
              <option value='featured'>Featured</option>
              <option value='priceLowToHigh'>Price, low to high</option>
              <option value='priceHighToLow'>Price, high to low</option>
              <option value='alphabeticallyAToZ'>Alphabetically, A-Z</option>
              <option value='alphabeticallyZToA'>Alphabetically, Z-A</option>
              <option value='dateOldToNew'>Date, old to new</option>
              <option value='dateNewToOld'>Date, new to old</option>
            </select>
          </div>
        </div>
      )}
      <div className='home__featured'>
        {props.featured ? (
          <div className='home__container'>
            <Carousel
              products={products}
              naturalSlideWidth={carouselWidth}
              naturalSlideHeight={carouselHeight}
              visibleSlides={numberOfSlides}
              isPlaying={false}
              step={4}
            />
          </div>
        ) : (
          displayedProducts
        )}
      </div>
      {props.featured ? (
        <Link
          to={`/collection/${props.collection.handle}`}
          className='button button__black button__black--show-more'
        >
          <p className='paragraph'>show more</p>
        </Link>
      ) : (
        <div>
          {currArrLength === 20 && (
            <button
              onClick={() => loadMoreProducts()}
              className='button button__black button__black--show-more'
            >
              <p className='paragraph'>load more</p>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(Collection);
