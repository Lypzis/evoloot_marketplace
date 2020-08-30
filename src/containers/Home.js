import React, {
	Fragment,
	useContext,
	useEffect,
	useCallback,
	useState,
} from 'react';

import Layout from '../hoc/Layout';
import { ClientContext } from '../context/clientContext';
import Card from '../components/Card';

const Home = props => {
	//temp
	const [homeCollections, setHomeCollections] = useState();

	const clientContext = useContext(ClientContext);
	const { collections } = clientContext;

	const getFeaturedProducts = useCallback(() => {
		if (collections) {
			//console.log(collections[0]); // title description
			//console.log(collections[0].products[0]);

			setHomeCollections(collections); //temp, needs a sample of all collections
			// publishedAt (new to old)
		}
	}, [collections]);

	useEffect(() => {
		getFeaturedProducts();
	}, [getFeaturedProducts]);

	const renderCollections = () => {
		console.log(homeCollections);

		return homeCollections.reverse().map(collection => {
			return (
				<div className='home__featured-section' key={collection.id}>
					<h2 className='heading-secondary heading-secondary--dark'>
						{collection.title}
					</h2>
					<h3 className='heading-tertiary heading-tertiary--dark'>
						{collection.description}
					</h3>
					<div className='home__featured'>
						{collection.products.slice(0, 4).map(product => {
							return <Card key={product.id} product={product} />;
						})}
					</div>
					{/* button to go to collection */}
				</div>
			);
		});
	};

	return (
		<Layout>
			{homeCollections && (
				<section className='home'>{renderCollections()}</section>
			)}
		</Layout>
	);
};

export default Home;
