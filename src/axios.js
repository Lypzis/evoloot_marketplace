import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://evoloot-marketplace-dev.myshopify.com',
	headers: {
		'X-Shopify-Storefront-Access-Token': '22244a0434741a7f12f81ea49a794d3b',
	},
});

export default instance;
