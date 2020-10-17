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
import Search from './Search';
import { AuthContext } from '../context/authContext';

import VolunteerApplication from '../containers/Identity/VolunteerApplication';
import Promise from '../containers/Identity/Promise';
import EventSchedule from '../containers/Identity/EventSchedule';
import ContactUs from '../containers/Identity/ContactUs';
import About from '../containers/Identity/About';

import Service from '../containers/Policies/Service';
import Refunds from '../containers/Policies/Refunds';
import Privacy from '../containers/Policies/Privacy';

function App() {
	const authContext = useContext(AuthContext);

	let routes = (
		<Switch>
			<Route path='/volunteer-application'>
				<VolunteerApplication />
			</Route>
			<Route path='/our-promise-to-our-customers'>
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
			</Route>
			<Route path='/terms-of-service'>
				<Service />
			</Route>
			<Route path='/refund-policy'>
				<Refunds />
			</Route>
			<Route path='/privacy-policy'>
				<Privacy />
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
				<ProductDetails />
			</Route>
			<Route path='/404'>
				<NotFound />
			</Route>
			<Route path='/'>
				<Home />
			</Route>
		</Switch>
	);

	if (authContext.customerToken)
		routes = (
			<Switch>
				<Route path='/volunteer-application'>
					<VolunteerApplication />
				</Route>
				<Route path='/our-promise-to-our-customers'>
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
				</Route>
				<Route path='/terms-of-service'>
					<Service />
				</Route>
				<Route path='/refund-policy'>
					<Refunds />
				</Route>
				<Route path='/privacy-policy'>
					<Privacy />
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
					<ProductDetails />
				</Route>
				<Route path='/404'>
					<NotFound />
				</Route>
				<Route path='/'>
					<Home />
				</Route>
			</Switch>
		);

	return routes;
}

export default App;
