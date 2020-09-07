import React from 'react';
import { Switch, Route } from 'react-router-dom';

import '../styles/main.scss';

import Home from './Home';
import CollectionProducts from './CollectionProducts';
import ProductDetails from './ProductDetails';

import NotFound from './NotFound';

// needs collections handlers

function App() {
	return (
		<Switch>
			<Route path='/collection/:handle'>
				<CollectionProducts />
			</Route>
			<Route path='/product/:handle'>
				<ProductDetails />
			</Route>
			<Route exact path='/'>
				<Home />
			</Route>
			<Route path='*'>
				<NotFound />
			</Route>
		</Switch>
	);
}

export default App;
