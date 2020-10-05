import * as actionTypes from '../actions/actionTypes';

const initialState = {
	firstName: '',
	lastName: '',
	email: '',
	mainAddress: null,
	orders: null,
};

const initializeUserDetails = action => {
	return {
		firstName: action.firstName,
		lastName: action.lastName,
		email: action.email,
		mainAddress: action.mainAddress,
	};
};

const updateUserAddress = (state, action) => {
	return {
		...state,
		mainAddress: action.mainAddress,
	};
};

const updateUserDetails = (state, action) => {
	return {
		...state,
		firstName: action.firstName,
		lastName: action.lastName,
		email: action.email,
	};
};

const setUserOrders = (state, action) => {
	return {
		...state,
		orders: action.orders.sort((a, b) => {
			const dateA = new Date(a.processedAt);
			const dateB = new Date(b.processedAt);

			return dateA < dateB;
		}),
	};
};

const updateUserOrders = (state, action) => {
	return {
		...state,
		orders: state.orders.concat(action.orders).sort((a, b) => {
			const dateA = new Date(a.processedAt);
			const dateB = new Date(b.processedAt);

			return dateA < dateB;
		}),
	};
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.INITIALIZE_USER_DETAILS:
			return initializeUserDetails(action);
		case actionTypes.UPDATE_USER_ADDRESS:
			return updateUserAddress(state, action);
		case actionTypes.UPDATE_USER_DETAILS:
			return updateUserDetails(state, action);
		case actionTypes.SET_USER_ORDERS:
			return setUserOrders(state, action);
		case actionTypes.UPDATE_USER_ORDERS:
			return updateUserOrders(state, action);
		default:
			return state;
	}
};

export default reducer;
