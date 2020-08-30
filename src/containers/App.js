import React from 'react';
import { Switch, Route } from 'react-router-dom';

import '../styles/main.scss';

import Home from './Home';
import CollectionProducts from './CollectionProducts';

// needs collections handlers

function App() {
	return (
		<Switch>
			<Route path='/:handle'>
				<CollectionProducts />
			</Route>
			<Route path='/'>
				<Home />
			</Route>
		</Switch>
	);
}

export default App;
