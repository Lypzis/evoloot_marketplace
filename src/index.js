import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Client from 'shopify-buy';

import App from './containers/App';
import * as serviceWorker from './serviceWorker';

const client = Client.buildClient({
	storefrontAccessToken: '22244a0434741a7f12f81ea49a794d3b',
	domain: 'evoloot-marketplace-dev.myshopify.com',
});

const app = (
	<BrowserRouter>
		<App client={client} />
	</BrowserRouter>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
