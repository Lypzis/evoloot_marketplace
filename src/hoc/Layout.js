import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import CartPanel from '../components/CartPanel';

// turn calltoaction into context
const Layout = props => (
	<div className='container__parent'>
		<Header callToAction={props.callToAction} loged={props.loged} />
		<CartPanel />
		<main className='container'>{props.children}</main>
		<Footer />
	</div>
);

export default Layout;
