import * as actionTypes from './actionTypes';

export const initializeUserDetails = (
	firstName,
	lastName,
	email,
	mainAddress
) => {
	return {
		type: actionTypes.INITIALIZE_USER_DETAILS,
		firstName,
		lastName,
		email,
		mainAddress,
	};
};

export const updateUserDetails = (firstName, lastName, email) => {
	return {
		type: actionTypes.UPDATE_USER_DETAILS,
		firstName,
		lastName,
		email,
	};
};

export const updateUserAddress = mainAddress => {
	return {
		type: actionTypes.UPDATE_USER_ADDRESS,
		mainAddress,
	};
};

export const setUserOrders = orders => {
	return {
		type: actionTypes.SET_USER_ORDERS,
		orders,
	};
};

export const updateUserOrders = orders => {
	return {
		type: actionTypes.UPDATE_USER_ORDERS,
		orders,
	};
};
