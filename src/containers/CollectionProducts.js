import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Layout from '../hoc/Layout';
import { ClientContext } from '../context/clientContext';
import Collection from '../components/Collection';

const CollectionProducts = props => {
	const [collection, setCollection] = useState();
	const { handle } = useParams();
	const history = useHistory();
	const clientContext = useContext(ClientContext);
	const { collections } = clientContext;

	const getCollection = useCallback(() => {
		if (collections) {
			const incomingCollection = collections.filter(
				collection => collection.handle === handle
			);

			setCollection(incomingCollection[0]);
		} else {
			history.replace('/*');
		}
	}, [collections, handle, history]);

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
