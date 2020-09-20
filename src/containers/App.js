import React from 'react';
import { Switch, Route } from 'react-router-dom';

import '../styles/main.scss';

import Home from './Home';
import CollectionProducts from './CollectionProducts';
import ProductDetails from './ProductDetails';
import Cart from './Cart';
import SignUp from './SignUp';
import Login from './Login';

import NotFound from './NotFound';

function App() {
	return (
		<Switch>
			<Route path='/signup'>
				<SignUp />
			</Route>
			<Route path='/login'>
				<Login />
			</Route>
			<Route path='/cart'>
				<Cart />
			</Route>
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
