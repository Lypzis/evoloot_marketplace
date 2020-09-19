import React, { useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Layout from '../hoc/Layout';
import LineProducts from '../components/LineProducts';
import { ClientContext } from '../context/clientContext';
import { removeAllProductsFromCheckout } from '../store/actions/checkout';

const Cart = props => {
	const checkout = useSelector(state => state.checkout);
	const dispatch = useDispatch();
	const clientContext = useContext(ClientContext);
	const history = useHistory();
	const [textAreaValue, setTextAreaValue] = useState('');

	const createCheckout = async () => {
		try {
			const lineItems = checkout.lineItems.map(product => {
				return {
					variantId: product.id,
					quantity: product.quantity,
				};
			});

			const newCheckout = await clientContext.client.checkout.create();

			const checkoutWithProducts = await clientContext.client.checkout.addLineItems(
				newCheckout.id,
				lineItems
			);

			window.open(checkoutWithProducts.webUrl);
			dispatch(removeAllProductsFromCheckout());
			history.push('/');
		} catch (err) {
			console.log('Something terrible happened ', err);
		}
	};

	return (
		<Layout>
			<div className='cart--page'>
				<h2 className='heading-secondary heading-secondary--dark'>
					My Cart
				</h2>
				<LineProducts big={true} />

				{/* NOTE: THIS IS USELESS RIGHT NOW */}
				<p className='paragraph paragraph--black'>
					Additional Comments:
				</p>
				<textarea
					className='input input__text-area'
					name='notes'
					id='notes'
					cols='50'
					maxLength={300}
					value={textAreaValue}
					onChange={event => setTextAreaValue(event.target.value)}
					rows='3'></textarea>
				{/* /////////////////////////////// */}

				<button
					className='button button__white button__white--card-big'
					disabled={checkout.totalPrice === 0}
					onClick={createCheckout}>
					<p className='paragraph card__price card__price--big cart__button-text'>
						proceed to checkout
					</p>
				</button>
			</div>
		</Layout>
	);
};

export default Cart;
