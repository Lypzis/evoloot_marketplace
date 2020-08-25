import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';

import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

const httpLink = createHttpLink({
	uri: 'https://evoloot-marketplace-dev.myshopify.com/api/graphql',
});

const middlewareLink = setContext(() => ({
	headers: {
		'X-Shopify-Storefront-Access-Token': '9eb32ab2c305cf16b722f08ef260d3b3',
	},
}));

const client = new ApolloClient({
	link: middlewareLink.concat(httpLink),
	cache: new InMemoryCache(),
});

ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
