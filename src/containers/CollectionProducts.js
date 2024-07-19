import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useParams } from 'react-router-dom';

import Layout from '../hoc/Layout';
import { ClientContext } from '../context/clientContext';
import Collection from '../components/Collection';

const CollectionProducts = props => {
	const [collection, setCollection] = useState();
	const { handle } = useParams();
	const clientContext = useContext(ClientContext);
	const { collections } = clientContext;

	/**
	 * Get a collection based on the
	 * current page 'params' which is going
	 * to be one of the collections 'handles'.
	 */
	const getCollection = useCallback(() => {
		if (collections) {
			const incomingCollection = collections.filter(
				collection => collection.handle === handle
			);

			setCollection(incomingCollection[0]);
		}
	}, [collections, handle]);

	useEffect(() => {
		getCollection();
	}, [getCollection]);

	return (
		<Layout>
			{collection && (
				<section className='home'>
					<Collection collection={collection} />
				</section>
			)}
		</Layout>
	);
};

export default CollectionProducts;
