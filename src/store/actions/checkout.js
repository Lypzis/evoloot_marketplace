import * as actionTypes from './actionTypes';

export const addProductToCheckout = (
	variant,
	productTitle,
	quantity,
	handle
) => {
	return {
		type: actionTypes.ADD_PRODUCT_TO_CHECKOUT,
		variant,
		productTitle,
		quantity,
		handle,
	};
};

export const removeProductFromCheckout = variant => {
	return {
		type: actionTypes.REMOVE_PRODUCT_FROM_CHECKOUT,
		variant,
	};
};

export const updateProductFromCheckout = (variant, quantity) => {
	return {
		type: actionTypes.UPDATE_PRODUCT_FROM_CHECKOUT,
		variant,
		quantity,
	};
};
