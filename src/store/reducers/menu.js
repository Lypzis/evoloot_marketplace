import * as actionTypes from '../actions/actionTypes';

const initialState = {
	toggle: false,
};

const toggleMenu = state => {
	return {
		toggle: !state.toggle,
	};
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.TOGGLE_MENU:
			return toggleMenu(state);
		default:
			return state;
	}
};

export default reducer;
