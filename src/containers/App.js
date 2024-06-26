import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';

import '../styles/main.scss';

import Home from './Home';
import CollectionProducts from './CollectionProducts';
import ProductDetails from './ProductDetails';
import ProductDetailsMobile from './ProductDetailsMobile';
import Cart from './Cart';
import SignUp from './SignUp';
import Login from './Login';
import NotFound from './NotFound';
import Profile from './Profile';
import Forget from './Forget';
import Search from './Search';
import Policies from '../containers/Policies';
import Pages from '../containers/Pages';
import { AuthContext } from '../context/authContext';

function App() {
	const authContext = useContext(AuthContext);

	let routes = (
		<Switch>
			{/* <Route path='/our-promise-to-our-customers'>
				<Promise />
			</Route>
			<Route path='/event-schedule'>
				<EventSchedule />
			</Route>
			<Route path='/contact-us'>
				<ContactUs />
			</Route>
			<Route path='/about'>
				<About />
			</Route> */}
			<Route path='/pages/:handle'>
				<Pages />
			</Route>
			<Route path='/policy/:handle'>
				<Policies />
			</Route>

			<Route path='/signup'>
				<SignUp />
			</Route>
			<Route path='/login'>
				<Login />
			</Route>
			<Route path='/forget'>
				<Forget />
			</Route>
			<Route path='/search'>
				<Search />
			</Route>
			<Route path='/cart'>
				<Cart />
			</Route>
			<Route path='/collection/:handle'>
				<CollectionProducts />
			</Route>
			<Route path='/product/:handle'>
				{window.innerWidth > 1140 ? (
					<ProductDetails />
				) : (
					<ProductDetailsMobile />
				)}
			</Route>
			<Route path='/'>
				<Home />
			</Route>
			<Route path='/404'>
				<NotFound />
			</Route>
		</Switch>
	);

	if (authContext.customerToken)
		routes = (
			<Switch>
				<Route path='/pages/:handle'>
					<Pages />
				</Route>
				<Route path='/policy/:handle'>
					<Policies />
				</Route>

				<Route path='/me'>
					<Profile />
				</Route>
				<Route path='/search'>
					<Search />
				</Route>
				<Route path='/cart'>
					<Cart />
				</Route>
				<Route path='/collection/:handle'>
					<CollectionProducts />
				</Route>
				<Route path='/product/:handle'>
					{window.innerWidth > 1140 ? (
						<ProductDetails />
					) : (
						<ProductDetailsMobile />
					)}
				</Route>
				<Route path='/'>
					<Home />
				</Route>
				<Route path='/404'>
					<NotFound />
				</Route>
			</Switch>
		);

	return routes;
}

export default App;
