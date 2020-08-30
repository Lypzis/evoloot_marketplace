import React, { useContext, useEffect, useCallback, useState } from 'react';

import Layout from '../hoc/Layout';
import { ClientContext } from '../context/clientContext';
import Collection from '../components/Collection';

const Home = props => {
	const [homeCollections, setHomeCollections] = useState();
	const clientContext = useContext(ClientContext);
	const { collections } = clientContext;

	const getFeaturedProducts = useCallback(() => {
		if (collections) setHomeCollections([...collections]);
	}, [collections]);

	useEffect(() => {
		getFeaturedProducts();
	}, [getFeaturedProducts]);

	const renderHomeCollections = useCallback(() => {
		return homeCollections
			.reverse()
			.map(collection => (
				<Collection
					key={collection.id}
					collection={collection}
					featured={true}
				/>
			));
	}, [homeCollections]);

	return (
		<Layout>
			{homeCollections && (
				<section className='home'>{renderHomeCollections()}</section>
			)}
		</Layout>
	);
};

export default Home;
