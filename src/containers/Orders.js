import React, { useState, useContext, useEffect, useCallback } from 'react';
//import Parse from 'parse';

import Layout from '../hoc/Layout';
import NavbarVertical from '../components/NavbarVertical';
import { getCustomerOrders } from '../graphql';
import axiosInstance from '../axios';
import { AuthContext } from '../context/authContext';
import OrderCard from '../components/OrderCard';

const Orders = props => {
	const authContext = useContext(AuthContext);
	const [currPointer, setCurrPointer] = useState(10);
	const [orders, setOrders] = useState([]);

	const getOrders = useCallback(async () => {
		try {
			const orders = await axiosInstance.post(
				'/api/graphql.json',
				getCustomerOrders(authContext.customerToken)
			);

			const ordersFormatted = orders.data.data.customer.orders.edges.map(
				el => el.node
			);

			for (let i = 0; i < ordersFormatted.length; ++i) {
				const formattedLineItems = [];

				for (
					let j = 0;
					j < ordersFormatted[i].lineItems.edges.length;
					++j
				) {
					formattedLineItems.push(
						ordersFormatted[i].lineItems.edges[j].node
					);
				}

				ordersFormatted[i].lineItems = formattedLineItems;
			}

			console.log(ordersFormatted);

			setOrders(ordersFormatted);
		} catch (err) {
			console.log(err);
		}
	}, [authContext.customerToken]);

	useEffect(() => {
		getOrders();
	}, [getOrders]);

	return (
		<Layout>
			<div className='profile'>
				<NavbarVertical />
				<div className='auth-form'>
					<h2 className='heading-secondary heading-secondary--dark auth-form__title'>
						My Orders
					</h2>
					{orders.length > 0 &&
						orders
							.reverse()
							.map((order, index) => (
								<OrderCard key={index} order={order} />
							))}
				</div>
			</div>
		</Layout>
	);
};

export default Orders;
