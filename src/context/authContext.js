import React, { useState, useEffect, useCallback } from 'react';
import Parse from 'parse';

export const AuthContext = React.createContext({
	currentUser: null,
	login: async (email, password) => {},
});

const AuthContextProvider = props => {
	const [user, setUser] = useState(false);

	const isUserOnline = useCallback(() => {
		const currentUser = Parse.User.current();

		if (currentUser) setUser(true);
	}, []);

	useEffect(() => {
		isUserOnline();
	}, [isUserOnline]);

	const loginHandler = async (email, password) => {
		try {
			setUser(true);

			// THIS NEEDS PURPOSE

			// const user = await axiosInstance.post(
			// 	'/api/graphql.json',
			// 	login(email, password)
			// );

			// console.log(user);

			// const {
			// 	customerAccessToken,
			// } = user.data.data.customerAccessTokenCreate;

			// setToken(customerAccessToken.accessToken);
			// setExpiration(customerAccessToken.expiresAt);

			// localStorage.setItem(
			// 	'userToken',
			// 	JSON.stringify(customerAccessToken)
			// );

			// return;
		} catch (err) {
			console.log('Something went terribly wrong! ', err);
			return err;
		}
	};

	// CONTINUE HERE
	// LOG OUT

	return (
		<AuthContext.Provider
			value={{ login: loginHandler, currentUser: user }}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
