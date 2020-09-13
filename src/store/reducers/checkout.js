import * as actionTypes from '../actions/actionTypes';

const initialState = {
	lineItems: [
		// variant
		// quantity: 5,
	],

	totalPrice: 0,
};

const addProductToCheckout = (state, action) => {
	const lineItemsCopy = [...state.lineItems];

	const alreadyAdded = lineItemsCopy.findIndex(
		lineItem => lineItem.id === action.variant.id
	);

	if (alreadyAdded !== -1) {
		lineItemsCopy[alreadyAdded].quantity += action.quantity;
	} else
		lineItemsCopy.push({
			...action.variant,
			quantity: action.quantity,
			productTitle: action.productTitle,
		});

	return {
		totalPrice: (state.totalPrice +=
			action.quantity * action.variant.price),
		lineItems: lineItemsCopy,
	};
};

const updateProductFromCheckout = (state, action) => {
	const lineItemsCopy = [...state.lineItems];
	let price = 0;

	const toUpdate = lineItemsCopy.findIndex(
		lineItem => lineItem.id === action.variant.id
	);

	lineItemsCopy[toUpdate].quantity += action.quantity;

	lineItemsCopy.forEach(item => (price += item.quantity * item.price));

	return {
		totalPrice: price,
		lineItems: lineItemsCopy,
	};
};

const removeProductFromCheckout = (state, action) => {
	const lineItemsCopy = [...state.lineItems];
	let price = state.totalPrice;

	const toRemove = lineItemsCopy.findIndex(
		lineItem => lineItem.id === action.variant.id
	);

	price -= lineItemsCopy[toRemove].quantity * lineItemsCopy[toRemove].price;

	lineItemsCopy.splice(toRemove, 1);

	return {
		totalPrice: price,
		lineItems: lineItemsCopy,
	};
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_PRODUCT_TO_CHECKOUT:
			return addProductToCheckout(state, action);
		case actionTypes.REMOVE_PRODUCT_FROM_CHECKOUT:
			return removeProductFromCheckout(state, action);
		case actionTypes.UPDATE_PRODUCT_FROM_CHECKOUT:
			return updateProductFromCheckout(state, action);
		default:
			return state;
	}
};

export default reducer;
