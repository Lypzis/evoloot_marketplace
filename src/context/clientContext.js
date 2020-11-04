import React, { useEffect, useState, useCallback } from 'react';
import Client from 'shopify-buy';
import { useHistory } from 'react-router-dom';
import { getShopPolicies, getShopPages, getShopCurrency } from '../graphql';
import axiosInstance from '../axios';

const client = Client.buildClient({
	storefrontAccessToken: '22244a0434741a7f12f81ea49a794d3b',
	domain: 'evoloot-marketplace-dev.myshopify.com',
});

export const ClientContext = React.createContext({
	client: null,
	collections: null,
	shopPolicies: null,
	shopCurrency: null,
	pages: null,
});

const ClientContextProvider = props => {
	const [collections, setCollections] = useState(null);
	const [shopPolicies, setShopPolicies] = useState(null);
	const [shopCurrency, setShopCurrency] = useState(null);
	const [pages, setPages] = useState(null);
	const history = useHistory();

	const getShopPagesData = async () => {
		try {
			const pages = await axiosInstance.post(
				'/api/graphql.json',
				getShopPages()
			);

			const arr = pages.data.data.pages.edges.map(el => {
				return { ...el.node };
			});

			setPages(arr);
		} catch (err) {
			console.log(err);
		}
	};

	const getShopCurrencyData = async () => {
		try {
			const currency = await axiosInstance.post(
				'/api/graphql.json',
				getShopCurrency()
			);

			setShopCurrency(
				currency.data.data.shop.paymentSettings.currencyCode
			);
		} catch (err) {
			console.log(err);
		}
	};

	const getShopPoliciesData = async () => {
		try {
			const arr = [];

			const policies = await axiosInstance.post(
				'/api/graphql.json',
				getShopPolicies()
			);

			for (let key in policies.data.data.shop) {
				arr.push(policies.data.data.shop[key]);
			}

			setShopPolicies(arr);
		} catch (err) {
			console.log(err);
		}
	};

	const getAllCollectionsWithProducts = useCallback(async () => {
		try {
			const collections = await client.collection.fetchAllWithProducts();

			setCollections(collections);
		} catch (err) {
			history.replace('/*');
		}
	}, [history]);

	useEffect(() => {
		getAllCollectionsWithProducts();
		getShopPoliciesData();
		getShopPagesData();
		getShopCurrencyData();
	}, [getAllCollectionsWithProducts]);

	return (
		<ClientContext.Provider
			value={{ client, collections, pages, shopPolicies, shopCurrency }}>
			{props.children}
		</ClientContext.Provider>
	);
};

export default ClientContextProvider;
