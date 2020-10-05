import * as actionTypes from './actionTypes';

export const setSearchText = searchText => {
	return {
		type: actionTypes.SET_SEARCHED_TEXT,
		searchText,
	};
};
