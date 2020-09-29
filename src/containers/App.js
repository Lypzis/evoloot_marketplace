import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';

import '../styles/main.scss';

import Home from './Home';
import CollectionProducts from './CollectionProducts';
import ProductDetails from './ProductDetails';
import Cart from './Cart';
import SignUp from './SignUp';
import Login from './Login';
import NotFound from './NotFound';
import Profile from './Profile';
import Forget from './Forget';
import { AuthContext } from '../context/authContext';

function App() {
	const authContext = useContext(AuthContext);

	let routes = (
		<Switch>
			<Route path='/signup'>
				<SignUp />
			</Route>
			<Route path='/login'>
				<Login />
			</Route>
			<Route path='/forget'>
				<Forget />
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

	if (authContext.customerToken)
		routes = (
			<Switch>
				<Route path='/me'>
					<Profile />
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

	return routes;
}

export default App;
