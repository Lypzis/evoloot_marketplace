import React, { useEffect, useState, useCallback } from 'react';
import Client from 'shopify-buy';
import { useHistory } from 'react-router-dom';
import {
	getShopPolicies,
	getShopPages,
	getShopCurrency,
	getCollectionProducts,
	getAllCollectionsAndProducts,
} from '../graphql';
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
	loadMoreCollectionProducts: () => {},
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
			let currencies;

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
				// TO-DO: replacement for herokuapp as it is only for development
				currencies = await axiosInstance.get(
					'https://evoloot.herokuapp.com/api/v1/currency/currencies'
				);

				console.log('currency expired or does not exist');

				const { rates } = currencies.data.data;

				localCurrencyRate = {
					dateAtTime: dateNow,
					rates,
				};

				localStorage.setItem(
					'currencyRates',
					JSON.stringify(localCurrencyRate)
				);

				setCurrencyRates(rates);
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
			const collections = await axiosInstance.post(
				'/api/graphql.json',
				getAllCollectionsAndProducts()
			);

			const tratedCollections = collections.data.data.collections.edges.map(
				collection => collection.node
			);

			tratedCollections.forEach(collection => {
				collection.products = treatCollectionProducts(
					collection.products.edges
				);
			});

			setCollections(tratedCollections.reverse());
		} catch (err) {
			history.replace('/*');
		}
	}, [history]);

	const treatCollectionProducts = products => {
		const newProducts = products.map((e, index) => {
			e.node.cursor = products[products.length - 1].cursor;

			return e.node;
		});

		// treat images
		newProducts.forEach(e => {
			const images = e.images.edges.map(image => {
				return {
					id: image.node.id,
					altText: image.node?.altText,
					src: image.node?.originalSrc,
				};
			});

			e.images = images;
		});

		// treat variants
		newProducts.forEach(e => {
			const variants = e.variants.edges.map(variant => {
				return {
					id: variant.node.id,
					title: variant.node?.title,
					available: variant.node?.availableForSale,
					price: variant.node.priceV2?.amount,
					image: {
						id: variant.node.image?.id,
						altText: variant.node.image?.altText,
						src: variant.node.image?.originalSrc,
					},
				};
			});

			e.variants = variants;
		});

		return newProducts;
	};

	const loadMoreCollectionProducts = async (handle, queryParam = null) => {
		try {
			const products = await axiosInstance.post(
				'/api/graphql.json',
				getCollectionProducts(handle, queryParam)
			);

			const productsArr =
				products.data.data.collectionByHandle.products.edges;

			if (productsArr.length > 0) {
				const cursor =
					productsArr[
						products.data.data.collectionByHandle.products.edges
							.length - 1
					].cursor;

				// add each node to the current corresponding collection array
				const collectionToAdd = collections.findIndex(
					e => e.handle === handle
				);

				console.log(productsArr);

				const productsTreated = treatCollectionProducts(productsArr);

				let collectionsCopy = Object.assign(collections);

				if (!queryParam) {
					collectionsCopy = Object.assign(collections);

					collectionsCopy[collectionToAdd].products = collectionsCopy[
						collectionToAdd
					].products.concat(productsTreated);

					console.log('if');

					setCollections(collectionsCopy);
				} else {
					collectionsCopy = Object.assign(collections);

					collectionsCopy[collectionToAdd].products = collectionsCopy[
						collectionToAdd
					].products.concat(productsTreated);

					console.log(
						'currentProducts: ',
						collectionsCopy[collectionToAdd].products
					);
					console.log('productsToAdd: ', productsTreated);

					console.log('else');

					setCollections(collectionsCopy);
				}

				return { cursor, length: productsArr.length };
			}

			return null;
		} catch (err) {
			console.log(err);
			history.replace('/*');
			return null;
		}
	};

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
				loadMoreCollectionProducts,
			}}>
			{props.children}
		</ClientContext.Provider>
	);
};

export default ClientContextProvider;
