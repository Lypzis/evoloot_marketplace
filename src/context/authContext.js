import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getCustomerToken, getUserSettingsAndAddress } from '../graphql';
import axiosInstance from '../axios';
import { initializeUserDetails } from '../store/actions/user';

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
	const dispatch = useDispatch();

	const getUserInformation = useCallback(
		async accessToken => {
			try {
				const userInfo = await axiosInstance.post(
					'/api/graphql.json',
					getUserSettingsAndAddress(accessToken)
				);

				const { customer } = userInfo.data.data;

				dispatch(
					initializeUserDetails(
						customer.firstName,
						customer.lastName,
						customer.email,
						customer.defaultAddress
					)
				);
			} catch (err) {
				console.log(err);
			}
		},
		[dispatch]
	);

	const isUserOnline = useCallback(async () => {
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

				// ALSO GET AND FILL REDUCER WITH CUSTOMER ADDRESS AND DETAILS
				await getUserInformation(token.accessToken);
			}
		}
	}, [getUserInformation]);

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

			setLoginError(false);
			setUserToken(customerAccessToken.accessToken);
			await getUserInformation(customerAccessToken.accessToken);

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
