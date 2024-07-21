import axios from 'axios';

const instance = axios.create({
  // store url
  baseURL: process.env.REACT_APP_STORE_URL,
  // key
  headers: {
    'X-Shopify-Storefront-Access-Token': process.env.REACT_APP_STORE_KEY,
  },
});

export default instance;
