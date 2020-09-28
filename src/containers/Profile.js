import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Settings from './Settings';
import Orders from './Orders';
import Address from './Address';

const Profile = props => {
	return (
		<Switch>
			<Route path='/me/address'>
				<Address />
			</Route>
			<Route path='/me/orders'>
				<Orders />
			</Route>
			<Route path='/me/settings'>
				<Settings />
			</Route>
			<Redirect from='/me' to='/me/settings' />
		</Switch>
	);
};

export default Profile;
