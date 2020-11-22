import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Layout from '../hoc/Layout';
import NavbarVertical from '../components/NavbarVertical';
import { getCustomerOrders } from '../graphql';
import axiosInstance from '../axios';
import { AuthContext } from '../context/authContext';
import OrderCard from '../components/OrderCard';
import { setUserOrders, updateUserOrders } from '../store/actions/user';
import LoadingBar from '../components/LoadingBar';

const Orders = props => {
	const authContext = useContext(AuthContext);
	const user = useSelector(state => state.user);
	const [currPointer, setCurrPointer] = useState();
	const [hasMore, setHasMore] = useState(false);
	const [loading, setLoading] = useState(false);
	const [loadingMoreOrders, setLoadingMoreOrders] = useState(false);
	const dispatch = useDispatch();

	const formatResults = orders => {
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

		return ordersFormatted;
	};

	const loadNewerOrders = async () => {
		try {
			setLoadingMoreOrders(true);
			const orders = await axiosInstance.post(
				'/api/graphql.json',
				getCustomerOrders(
					authContext.customerToken,
					`first: 5, after: "${currPointer}"`
				)
			);

			setHasMore(orders.data.data.customer.orders.pageInfo.hasNextPage);
			setCurrPointer(
				orders.data.data.customer.orders.edges[
					orders.data.data.customer.orders.edges.length - 1
				].cursor
			);

			const ordersFormatted = formatResults(orders);

			dispatch(updateUserOrders(ordersFormatted));
			setLoadingMoreOrders(false);
		} catch (err) {
			setLoadingMoreOrders(false);
			console.log(err);
		}
	};

	const getOrders = useCallback(async () => {
		try {
			setLoading(true);
			const orders = await axiosInstance.post(
				'/api/graphql.json',
				getCustomerOrders(authContext.customerToken)
			);

			setHasMore(orders.data.data.customer.orders.pageInfo.hasNextPage);
			setCurrPointer(
				orders.data.data.customer.orders.edges[
					orders.data.data.customer.orders.edges.length - 1
				].cursor
			);

			const ordersFormatted = formatResults(orders);

			dispatch(setUserOrders(ordersFormatted));
			setLoading(false);
		} catch (err) {
			setLoading(false);
			//console.log(err);
		}
	}, [authContext.customerToken, dispatch]);

	useEffect(() => {
		getOrders();
	}, [getOrders]);

	return (
		<Layout>
			<div className='profile'>
				<NavbarVertical />
				<div className='auth-form'>
					<div className='auth-form__field-button  auth-form__field-button--with-title'>
						<h2 className='heading-secondary heading-secondary--dark auth-form__title'>
							My Orders
						</h2>
						{hasMore && (
							<>
								{!loadingMoreOrders ? (
									<button
										className='button button__black button__black--card-small'
										onClick={loadNewerOrders}>
										<p className='paragraph card__price card__price cart__button-text'>
											Load Newer Orders
										</p>
									</button>
								) : (
									<LoadingBar
										loading={loadingMoreOrders}
										marginTop='3rem'
										width={150}
									/>
								)}
							</>
						)}
					</div>

					{loading ? (
						<LoadingBar
							loading={loading}
							marginTop='5rem'
							width={150}
						/>
					) : (
						<>
							{user.orders ? (
								user.orders.map((order, index) => (
									<OrderCard key={index} order={order} />
								))
							) : (
								<h3 className='heading-tertiary heading-tertiary--dark'>
									-- ...you haven't ordered anything yet :(.
									--
								</h3>
							)}
						</>
					)}
				</div>
			</div>
		</Layout>
	);
};

export default Orders;
