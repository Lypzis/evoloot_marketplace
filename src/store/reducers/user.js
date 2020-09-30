import * as actionTypes from '../actions/actionTypes';

const initialState = {
	firstName: '',
	lastName: '',
	email: '',
	mainAddress: null,
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

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.INITIALIZE_USER_DETAILS:
			return initializeUserDetails(action);
		case actionTypes.UPDATE_USER_ADDRESS:
			return updateUserAddress(state, action);
		case actionTypes.UPDATE_USER_DETAILS:
			return updateUserDetails(state, action);
		default:
			return state;
	}
};

export default reducer;
