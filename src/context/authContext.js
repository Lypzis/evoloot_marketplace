import React, { useState, useEffect, useCallback } from 'react';
import Parse from 'parse';
import { useHistory } from 'react-router-dom';

import { getCustomerToken } from '../graphql';
import axiosInstance from '../axios';

export const AuthContext = React.createContext({
	currentUser: null,
	customerToken: null,
	loginError: false,
	login: async (username, password) => {},
	logout: async () => {},
	userIsOnline: () => {},
});

const AuthContextProvider = props => {
	const [user, setUser] = useState(false);
	const [userToken, setUserToken] = useState();
	const [loginError, setLoginError] = useState(false);
	const history = useHistory();

	const isUserOnline = useCallback(async () => {
		const currentUser = Parse.User.current();
		let token = null;

		const shopifyCustomerToken = localStorage.getItem(
			'shopifyCustomerToken'
		);

		if (currentUser && shopifyCustomerToken) {
			token = JSON.parse(shopifyCustomerToken);

			const date = new Date();
			const expiresAt = new Date(token.expiresAt);

			if (date > expiresAt) await logoutHandler();
			else setUser(true);
		}
	}, []);

	useEffect(() => {
		isUserOnline();
	}, [isUserOnline]);

	const logoutHandler = async () => {
		try {
			await Parse.User.logOut();
			setUser(false);
			setUserToken(null);
			localStorage.removeItem('shopifyCustomerToken');
		} catch (err) {
			// connection error
			console.log('Something weird happened! ', err);
		}
	};

	const loginHandler = async (username, password) => {
		try {
			const user = await Parse.User.logIn(username, password);
			const userEmail = user.getEmail();

			const customerToken = await axiosInstance.post(
				'/api/graphql.json',
				getCustomerToken(userEmail, password)
			);

			const {
				customerAccessToken,
			} = customerToken.data.data.customerAccessTokenCreate;

			localStorage.setItem(
				'shopifyCustomerToken',
				JSON.stringify(customerAccessToken)
			);

			setUser(true);
			setUserToken(customerAccessToken);

			history.replace('/');
		} catch (err) {
			if (err.message === 'Invalid username/password.')
				setLoginError(true);

			// else connection error
		}
	};

	// CONTINUE HERE
	// LOG OUT

	return (
		<AuthContext.Provider
			value={{
				currentUser: user,
				customerToken: userToken,
				loginError,
				login: loginHandler,
				logout: logoutHandler,
				userIsOnline: isUserOnline,
			}}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
