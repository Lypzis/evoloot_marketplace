import React, { Fragment, memo } from 'react';
import {
	CarouselProvider,
	Slider,
	Slide,
	ButtonBack,
	ButtonNext,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import Card from './Card';

const Carousel = props => (
	<Fragment>
		{props.products.length > 0 && (
			<CarouselProvider
				naturalSlideWidth={props.naturalSlideWidth}
				naturalSlideHeight={props.naturalSlideHeight}
				totalSlides={props.products.length}
				visibleSlides={props.visibleSlides}
				isPlaying={props.isPlaying}
				orientation='horizontal'
				infinite={true}>
				<div
					className={`product__carousel-controllers ${
						!props.productDetails
							? 'product__carousel-controllers--home'
							: ''
					}`}>
					<div className='product__carousel-controllers-header'>
						{props.header}
					</div>
					<ButtonBack className='button button__black button__black--arrow button__black--arrow-right'>
						&lt;
					</ButtonBack>
					<ButtonNext className='button button__black button__black--arrow'>
						&gt;
					</ButtonNext>
				</div>
				<Slider>
					{props.products.map((product, index) => {
						return (
							<Slide
								key={product.id}
								index={index}
								innerClassName='product__carousel-container'>
								<Card
									product={product}
									noEffect={true}
									productDetails={props.productDetails}
								/>
							</Slide>
						);
					})}
				</Slider>
			</CarouselProvider>
		)}
	</Fragment>
);

export default memo(Carousel);
