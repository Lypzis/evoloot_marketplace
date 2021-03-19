import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getUserSettingsAndAddress } from '../graphql';
import axiosInstance from '../axios';
import { initializeUserDetails } from '../store/actions/user';

export const AuthContext = React.createContext({
	customerToken: null,
	loginError: false,
	login: async token => {},
	logout: async () => {},
	userIsOnline: () => {},
	refreshToken: customerToken => {},
});

const AuthContextProvider = props => {
	const [userToken, setUserToken] = useState();

	const history = useHistory();
	const dispatch = useDispatch();

	/**
	 * Gets current user information and stores
	 * it at the reducer.
	 */
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

	/**
	 * Retrieve user token and get user information.
	 * - verifies if the token is stored at the local storage.
	 * - If there is a token, verify its expiration date.
	 * - If both token and expiration date are ok, set user token and
	 * retrieve his information.
	 */
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

	/**
	 * Logs the user out.
	 * - Deletes stored user token and sends user to home page.
	 */
	const logoutHandler = async () => {
		setUserToken(null);
		localStorage.removeItem('shopifyCustomerToken');
		history.replace('/');
	};

	/**
	 * Replace or create a new user token.
	 * @param {Object} customerToken
	 */
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

	/**
	 * Logs in user.
	 * - set current token then retrieves user information.
	 * @param {String} token
	 */
	const loginHandler = async token => {
		try {
			setUserToken(token);
			await getUserInformation(token);
		} catch (err) {
			//console.log(err);
			// else connection error
		}
	};

	return (
		<AuthContext.Provider
			value={{
				customerToken: userToken,
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
