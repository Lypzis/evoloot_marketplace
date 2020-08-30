import React, { useEffect, useState, useCallback } from 'react';
import Client from 'shopify-buy';

const client = Client.buildClient({
	storefrontAccessToken: '22244a0434741a7f12f81ea49a794d3b',
	domain: 'evoloot-marketplace-dev.myshopify.com',
});

export const ClientContext = React.createContext({
	client: null,
	collections: null,
});

const ClientContextProvider = props => {
	const [collections, setCollections] = useState(null);

	const getAllCollectionsWithProducts = useCallback(async () => {
		try {
			const collections = await client.collection.fetchAllWithProducts();

			setCollections(collections);
		} catch (err) {
			console.log(err);
		}
	}, []);

	useEffect(() => {
		getAllCollectionsWithProducts();
	}, [getAllCollectionsWithProducts]);

	return (
		<ClientContext.Provider value={{ client, collections }}>
			{props.children}
		</ClientContext.Provider>
	);
};

export default ClientContextProvider;
