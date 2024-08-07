import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

import ClientContextProvider from './context/clientContext';
import AuthContextProvider from './context/authContext';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';

import checkoutReducer from './store/reducers/checkout';
import userReducer from './store/reducers/user';
import searchReducer from './store/reducers/search';
import menuReducer from './store/reducers/menu';

const rootReducers = combineReducers({
	checkout: checkoutReducer,
	user: userReducer,
	search: searchReducer,
	menu: menuReducer,
});

const store = createStore(rootReducers);

const app = (
	<Provider store={store}>
		<BrowserRouter>
			<AuthContextProvider>
				<ClientContextProvider>
					<App />
				</ClientContextProvider>
			</AuthContextProvider>
		</BrowserRouter>
	</Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
