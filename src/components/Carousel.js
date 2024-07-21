import React, { Fragment, memo, useState, useEffect } from 'react';
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import Card from './Card';

const Carousel = props => {
  const [addButtons, setAddButtons] = useState(window.innerWidth > 850);

  const handleResize = () => setAddButtons(window.innerWidth > 850);

  useEffect(() => {
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Fragment>
      {props.products.length > 0 && (
        <CarouselProvider
          naturalSlideWidth={props.naturalSlideWidth}
          naturalSlideHeight={props.naturalSlideHeight}
          totalSlides={props.products.length}
          visibleSlides={props.visibleSlides}
          isPlaying={props.isPlaying}
          orientation='horizontal'
          className={
            props.productDetails
              ? 'product__carousel-body product__carousel-body--product-detail '
              : 'product__carousel-body'
          }
          infinite={true}
          step={props.step} // needs to be dinamic
        >
          <div
            className={`product__carousel-controllers ${
              !props.productDetails ? 'product__carousel-controllers--home' : ''
            }`}
          >
            <div className='product__carousel-controllers-header'>
              {props.header}
            </div>
          </div>
          {addButtons && (
            <ButtonBack className='button button__black button__black--arrow button__black--arrow-right'>
              &lt;
            </ButtonBack>
          )}
          <Slider className='product__carousel-slider'>
            {props.products.map((product, index) => {
              return (
                <Slide
                  key={product.id}
                  index={index}
                  innerClassName='product__carousel-container'
                >
                  <Card
                    product={product}
                    noEffect={true}
                    productDetails={props.productDetails}
                  />
                </Slide>
              );
            })}
          </Slider>
          {addButtons && (
            <ButtonNext className='button button__black button__black--arrow button__black--arrow-left'>
              &gt;
            </ButtonNext>
          )}
        </CarouselProvider>
      )}
    </Fragment>
  );
};

export default memo(Carousel);
