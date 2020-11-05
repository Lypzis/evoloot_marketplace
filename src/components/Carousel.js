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
				<div className='product__carousel-controllers'>
					<ButtonBack>Back</ButtonBack>
					<ButtonNext>Next</ButtonNext>
				</div>
				<Slider>
					{props.products.map((product, index) => {
						return (
							<Slide
								key={product.id}
								index={index}
								innerClassName='product__carousel-container'>
								<Card product={product} noEffect={true} />
							</Slide>
						);
					})}
				</Slider>
			</CarouselProvider>
		)}
	</Fragment>
);

export default memo(Carousel);
