import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import Card from '../components/Card';

const Collection = memo(props => {
	return (
		<div className='home__featured-section' key={props.collection.id}>
			<h2 className='heading-secondary heading-secondary--dark'>
				{props.collection.title}
			</h2>
			<h3 className='heading-tertiary heading-tertiary--dark'>
				{props.collection.description}
			</h3>
			<div className='home__featured'>
				{props.featured
					? props.collection.products.slice(0, 4).map(product => {
							return (
								<Card
									collectionHandle={props.collection.handle}
									key={product.id}
									product={product}
								/>
							);
					  })
					: props.collection.products.map(product => {
							return (
								<Card
									collectionHandle={props.collection.handle}
									key={product.id}
									product={product}
								/>
							);
					  })}
			</div>
			{props.featured && (
				<Link
					to={`/collection/${props.collection.handle}`}
					className='button button__white button__white--show-more'>
					<p className='paragraph'>show more</p>
				</Link>
			)}
		</div>
	);
});

export default Collection;
