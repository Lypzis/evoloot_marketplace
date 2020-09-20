import React from 'react';

export const UserContext = React.createContext({
	token: null,
	user: null,
});

const Auth = props => {
	return <UserContext.Provider>{props.children}</UserContext.Provider>;
};

export default Auth;
