import React, { memo } from 'react';

import Card from '../components/Card';

const Collection = props => {
	return (
		<div className='home__featured-section'>
			<h2 className='heading-secondary heading-secondary--dark'>
				Searched Results
			</h2>

			<div className='home__featured'>
				{props.products.map(product => (
					<Card key={product.id} product={product} />
				))}
			</div>
		</div>
	);
};

export default memo(Collection);
