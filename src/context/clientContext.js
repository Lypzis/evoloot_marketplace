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
	currencyRate: { code: 'USD', value: 1 },
	changeCurrency: currency => {},
	pages: null,
});

const ClientContextProvider = props => {
	const [collections, setCollections] = useState(null);
	const [shopPolicies, setShopPolicies] = useState(null);
	const [shopCurrency, setShopCurrency] = useState(null);
	const [pages, setPages] = useState(null);
	const [currencyRates, setCurrencyRates] = useState(null);
	const [currencyRate, setCurrencyRate] = useState({ code: 'USD', value: 1 });
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

	const getCurrencyRate = async () => {
		try {
			let localCurrencyRate = null;
			let rates;

			const savedCurrencyRates = localStorage.getItem('currencyRates');

			const dateNow = Math.round(new Date().getTime() / 1000);
			const dateYesterday = dateNow - 24 * 3600;

			if (savedCurrencyRates)
				localCurrencyRate = JSON.parse(savedCurrencyRates);

			if (
				localCurrencyRate &&
				localCurrencyRate.dateAtTime >= dateYesterday
			) {
				console.log('currency up to date');

				setCurrencyRates(localCurrencyRate.rates);
			} else {
				rates = await axiosInstance.get(
					'https://cors-anywhere.herokuapp.com/https://open.exchangerate-api.com/v6/latest'
				);

				console.log('currency expired or does not exist');

				console.log(rates.data.rates);

				localCurrencyRate = {
					dateAtTime: dateNow,
					rates: rates.data.rates,
				};

				localStorage.setItem(
					'currencyRates',
					JSON.stringify(localCurrencyRate)
				);

				setCurrencyRates(rates.data.rates);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const changeCurrency = currency => {
		setCurrencyRate({ code: currency, value: currencyRates[currency] });
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

			setCollections(collections.reverse());
		} catch (err) {
			history.replace('/*');
		}
	}, [history]);

	useEffect(() => {
		getAllCollectionsWithProducts();
		getShopPoliciesData();
		getShopPagesData();
		getShopCurrencyData();
		getCurrencyRate();
	}, [getAllCollectionsWithProducts]);

	return (
		<ClientContext.Provider
			value={{
				client,
				collections,
				pages,
				shopPolicies,
				shopCurrency,
				currencyRate,
				changeCurrency,
			}}>
			{props.children}
		</ClientContext.Provider>
	);
};

export default ClientContextProvider;
