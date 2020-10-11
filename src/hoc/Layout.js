import React from 'react';

import Header from '../components/Header';
import HeaderMobile from '../components/HeaderMobile';
import Footer from '../components/Footer';
import CartPanel from '../components/CartPanel';
import MenuPanel from '../components/MenuPanel';

// turn calltoaction into context
const Layout = props => (
	<div className='container__parent'>
		{window.innerWidth > 1140 ? (
			<Header callToAction={props.callToAction} loged={props.loged} />
		) : (
			<HeaderMobile />
		)}

		{window.innerWidth <= 1140 && <MenuPanel />}

		<CartPanel />
		<main className='container'>{props.children}</main>
		<Footer />
	</div>
);

export default Layout;
