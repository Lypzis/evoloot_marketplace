import React, {
	Fragment,
	useContext,
	useEffect,
	useCallback,
	useState,
} from 'react';

import Layout from '../hoc/Layout';
import { ClientContext } from '../context/clientContext';
import sprite from '../assets/icons/sprite.svg';

const Home = props => {
	//temp
	const [collection, setCollection] = useState();

	const clientContext = useContext(ClientContext);
	const { collections } = clientContext;

	const getFeaturedProducts = useCallback(() => {
		if (collections) {
			//console.log(collections[0]); // title description
			//console.log(collections[0].products[0]);

			setCollection(collections[0]); //temp, needs a sample of all collections
			// publishedAt (new to old)
		}
	}, [collections]);

	useEffect(() => {
		getFeaturedProducts();
	}, [getFeaturedProducts]);

	return (
		<Layout>
			{collection && (
				<section className='home'>
					<h2 className='heading-secondary'>{collection.title}</h2>
					<h3 className='heading-tertiary'>
						{collection.description}
					</h3>
					<div className='home__featured'>
						{collection.products.slice(0, 4).map(product => {
							return (
								<div key={product.id} className='card'>
									{/* image */}
									<div className='card__image-box'>
										<img
											className='card__image'
											src={product.images[0].src}
											alt={
												product.images[0].altText
													? product.images[0].altText
													: product.title
											}
										/>
									</div>

									{/* title product.title*/}
									<h3 className='heading-tertiary card__title'>
										{product.title}
									</h3>

									{/* price */}
									<button className='button button__price button__price--card'>
										{/* <svg className='button__icon button__icon--card'>
										<use
											xlinkHref={`${sprite}#icon-cart`}></use>
									</svg>
									<p className='paragraph'>Shopping Cart</p> */}
										<p className='paragraph'>
											CAD$ {product.variants[0].price}
										</p>
									</button>
								</div>
							);
						})}
					</div>
				</section>
			)}
		</Layout>
	);
};

export default Home;
