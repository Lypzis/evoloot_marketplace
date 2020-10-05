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

	const getCollection = useCallback(() => {
		if (collections) {
			//search.searchText

			const collectionProducts = collections.map(
				collection => collection.products
			);

			let allProducts = [];

			collectionProducts.forEach(products => {
				allProducts = allProducts.concat(products);
			});

			const result = [];
			allProducts.forEach(product => {
				search.searchText.split(' ').forEach(word => {
					//  If typed word is different than -1, it matches.
					if (
						product.title
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
		getCollection();
	}, [getCollection]);

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
