import React from 'react';
import Client from 'shopify-buy';

const client = Client.buildClient({
	storefrontAccessToken: '22244a0434741a7f12f81ea49a794d3b',
	domain: 'evoloot-marketplace-dev.myshopify.com',
});

export const ClientContext = React.createContext({
	client: null,
});

const ClientContextProvider = props => (
	<ClientContext.Provider value={{ client }}>
		{props.children}
	</ClientContext.Provider>
);

export default ClientContextProvider;
