import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { getCustomerToken } from '../graphql';
import axiosInstance from '../axios';

export const AuthContext = React.createContext({
	customerToken: null,
	loginError: false,
	login: async (username, password) => {},
	logout: async () => {},
	userIsOnline: () => {},
	refreshToken: customerToken => {},
});

const AuthContextProvider = props => {
	const [userToken, setUserToken] = useState();
	const [loginError, setLoginError] = useState(false);
	const history = useHistory();

	const isUserOnline = useCallback(() => {
		let token = null;

		const shopifyCustomerToken = localStorage.getItem(
			'shopifyCustomerToken'
		);

		if (shopifyCustomerToken) token = JSON.parse(shopifyCustomerToken);

		if (token) {
			const date = new Date();
			const expiresAt = new Date(token.expiresAt);

			if (!(date > expiresAt)) {
				setUserToken(token.accessToken);
			}
		}
	}, []);

	useEffect(() => {
		isUserOnline();
	}, [isUserOnline]);

	const logoutHandler = async () => {
		setUserToken(null);
		localStorage.removeItem('shopifyCustomerToken');
		history.replace('/');
	};

	const refreshToken = customerToken => {
		const {
			customerAccessToken,
		} = customerToken.data.data.customerAccessTokenCreate;

		localStorage.setItem(
			'shopifyCustomerToken',
			JSON.stringify(customerAccessToken)
		);

		setUserToken(customerAccessToken.accessToken);
	};

	const loginHandler = async (email, password) => {
		try {
			const customerToken = await axiosInstance.post(
				'/api/graphql.json',
				getCustomerToken(email, password)
			);

			if (
				customerToken.data.data.customerAccessTokenCreate
					.customerUserErrors.length > 0
			)
				throw new Error(
					customerToken.data.data.customerAccessTokenCreate.customerUserErrors.message
				);

			const {
				customerAccessToken,
			} = customerToken.data.data.customerAccessTokenCreate;

			localStorage.setItem(
				'shopifyCustomerToken',
				JSON.stringify(customerAccessToken)
			);

			setUserToken(customerAccessToken.accessToken);

			history.replace('/');
		} catch (err) {
			//console.log(err);
			setLoginError(true);

			// else connection error
		}
	};

	return (
		<AuthContext.Provider
			value={{
				customerToken: userToken,
				loginError,
				refreshToken,
				login: loginHandler,
				logout: logoutHandler,
				userIsOnline: isUserOnline,
			}}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
