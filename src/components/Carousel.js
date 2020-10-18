import React, { Fragment, memo } from 'react';
import Flicking from '@egjs/react-flicking';
import { Fade } from '@egjs/flicking-plugins';

import Card from './Card';

const plugins = [new Fade()];

const Carousel = props => (
	<Fragment>
		{props.products.length > 0 && (
			<Flicking
				className='product__carousel'
				tag='div'
				viewportTag='div'
				cameraTag='div'
				deceleration={0.0075}
				horizontal={true}
				infinite={true}
				lastIndex={Infinity}
				threshold={40}
				plugins={plugins}
				panelEffect={x => 1 - Math.pow(1 - x, 3)}
				defaultIndex={1}
				inputType={['touch', 'mouse']}
				thresholdAngle={45}
				bounce={10}
				autoResize={true}
				adaptive={true}
				zIndex={2000}
				hanger={'50%'}
				anchor={'50%'}
				gap={15} //50
				moveType={{ type: 'snap', count: 1 }}
				collectStatistics={false}>
				{props.products.map(product => {
					return (
						<Card
							key={product.id}
							product={product}
							noEffect={true}
						/>
					);
				})}
			</Flicking>
		)}
	</Fragment>
);

export default memo(Carousel);
