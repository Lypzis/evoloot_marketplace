import React, { memo } from 'react';
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import image01 from '../assets/images/Rotating_Product_Banner_Finals_1.png';
import image02 from '../assets/images/Rotating_Product_Banner_Finals_2.jpg';
import image03 from '../assets/images/Rotating_Product_Banner_Finals_3.jpg';
import image04 from '../assets/images/Rotating_Product_Banner_Finals_4.jpg';

const images = [image01, image02, image03, image04];

const BannerCarousel = props => {
	const changeHeight = () => {
		if (window.innerWidth <= 600) return 40;
		else if (window.innerWidth <= 850) return 50;
		else return 38;
	};

	return (
		<CarouselProvider
			naturalSlideWidth={100}
			naturalSlideHeight={changeHeight()}
			totalSlides={images.length}
			visibleSlides={1}
			isPlaying={true}
			orientation='horizontal'
			className='banner'
			interval={6000}
			infinite={true}>
			<Slider>
				{images.map(image => (
					<Slide key={image} innerClassName='banner__slide'>
						<div className='banner__container'>
							<div className='banner__card'>
								<img
									className='banner__image'
									src={image}
									alt='promo banner'
								/>
							</div>
						</div>
					</Slide>
				))}
			</Slider>
		</CarouselProvider>
	);
};

export default memo(BannerCarousel);
