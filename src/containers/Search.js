import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useSelector } from 'react-redux';

import Layout from '../hoc/Layout';
import { ClientContext } from '../context/clientContext';
import SearchedResults from '../components/SearchedResults';

const Search = props => {
	const [products, setProducts] = useState();
	const clientContext = useContext(ClientContext);
	const search = useSelector(state => state.search);
	const { collections } = clientContext;

	/**
	 * Searches through the collections for a product
	 * handle that matches the search input.
	 */
	const getMatchingProducts = useCallback(() => {
		if (collections && search.searchText !== '') {
			const collectionProducts = collections.map(
				collection => collection.products
			);

			let allProducts = [];

			collectionProducts.forEach(products => {
				allProducts = allProducts.concat(products);
			});

			let restructure = search.searchText.split(' ');
			restructure = restructure.join('-');

			const result = [];
			allProducts.forEach(product => {
				restructure.split(' ').forEach(word => {
					//  If typed word is different than -1, it matches.
					if (
						product.handle

							.toLowerCase()
							.indexOf(word.toLowerCase()) !== -1
					) {
						result.push(product);
					}
				});
			});

			setProducts(result);
		}
	}, [collections, search.searchText]);

	useEffect(() => {
		getMatchingProducts();
	}, [getMatchingProducts]);

	return (
		<Layout>
			{products && (
				<section className='home'>
					<SearchedResults products={products} />
				</section>
			)}
		</Layout>
	);
};

export default Search;
