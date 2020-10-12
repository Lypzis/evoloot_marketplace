import React, { memo, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

import Card from '../components/Card';

const Collection = props => {
	const { products } = props.collection;

	const [displayedProducts, setDisplayedProducts] = useState(
		props.featured
			? products.slice(0, 3).map(product => {
					return <Card key={product.id} product={product} />;
			  })
			: products.map(product => {
					return <Card key={product.id} product={product} />;
			  })
	);

	const sortBy = event => {
		event.preventDefault();

		let sorted;

		switch (event.target.value) {
			case 'featured':
				sorted = products.sort(
					(a, b) => new Date(a.publishedAt) < new Date(b.publishedAt)
				);
				renderProducts(sorted);
				break;
			case 'priceLowToHigh':
				sorted = products.sort(
					(a, b) => a.variants[0].price > b.variants[0].price
				);
				renderProducts(sorted);
				break;
			case 'priceHighToLow':
				sorted = products.sort(
					(a, b) => a.variants[0].price < b.variants[0].price
				);
				renderProducts(sorted);
				break;
			case 'alphabeticallyAToZ':
				sorted = products.sort((a, b) => a.title > b.title);
				renderProducts(sorted);
				break;
			case 'alphabeticallyZToA':
				sorted = products.sort((a, b) => a.title < b.title);
				renderProducts(sorted);
				break;
			case 'dateOldToNew':
				sorted = products.sort(
					(a, b) => new Date(a.publishedAt) > new Date(b.publishedAt)
				);
				renderProducts(sorted);
				break;
			case 'dateNewToOld':
				sorted = products.sort(
					(a, b) => new Date(a.publishedAt) < new Date(b.publishedAt)
				);
				renderProducts(sorted);
				break;
			default:
				sorted = products.sort(
					(a, b) => new Date(a.publishedAt) < new Date(b.publishedAt)
				);
				renderProducts(sorted);
		}
	};

	const renderProducts = arr => {
		setDisplayedProducts(
			arr.map(product => {
				return <Card key={product.id} product={product} />;
			})
		);
	};

	useEffect(() => {
		console.log('getting heehee');
		setDisplayedProducts(
			props.featured
				? products
						.sort(
							(a, b) =>
								new Date(a.publishedAt) <
								new Date(b.publishedAt)
						)
						.slice(0, 3)
						.map(product => {
							return <Card key={product.id} product={product} />;
						})
				: products
						.sort(
							(a, b) =>
								new Date(a.publishedAt) <
								new Date(b.publishedAt)
						)
						.map(product => {
							return <Card key={product.id} product={product} />;
						})
		);
	}, [products, props.featured]);

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
							className='input input__select input__select--collection'
							onChange={sortBy}>
							<option value='featured'>Featured</option>
							<option value='priceLowToHigh'>
								Price, low to high
							</option>
							<option value='priceHighToLow'>
								Price, high to low
							</option>
							<option value='alphabeticallyAToZ'>
								Alphabetically, A-Z
							</option>
							<option value='alphabeticallyZToA'>
								Alphabetically, Z-A
							</option>
							<option value='dateOldToNew'>
								Date, old to new
							</option>
							<option value='dateNewToOld'>
								Date, new to old
							</option>
						</select>
					</div>
				</div>
			)}
			<div className='home__featured'>{displayedProducts}</div>
			{props.featured && (
				<Link
					to={`/collection/${props.collection.handle}`}
					className='button button__white button__white--show-more'>
					<p className='paragraph'>show more</p>
				</Link>
			)}
		</div>
	);
};

export default memo(Collection);
