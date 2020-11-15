import React, { memo } from 'react';

import Card from '../components/Card';

const Collection = props => {
	return (
		<div className='home__featured-section'>
			<h2 className='heading-secondary heading-secondary--dark'>
				Searched Results
			</h2>

			{props.products.length > 0 ? (
				<div className='home__featured'>
					{props.products.map(product => (
						<Card key={product.id} product={product} />
					))}
				</div>
			) : (
				<h3 className='heading-tertiary heading-tertiary--dark'>
					-- ...nothing was found :(, please try something else. --
				</h3>
			)}
		</div>
	);
};

export default memo(Collection);
