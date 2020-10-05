import * as actionTypes from '../actions/actionTypes';

const initialState = {
	searchText: '',
};

const setSearchText = action => {
	return {
		searchText: action.searchText,
	};
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_SEARCHED_TEXT:
			return setSearchText(action);
		default:
			return state;
	}
};

export default reducer;
