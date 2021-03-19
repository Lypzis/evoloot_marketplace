import React from 'react';

import Header from '../components/Header';
import HeaderMobile from '../components/HeaderMobile';
import Footer from '../components/Footer';
import CartPanel from '../components/CartPanel';
import MenuPanel from '../components/MenuPanel';

const Layout = props => (
	<div className='container__parent'>
		{window.innerWidth > 1140 ? <Header /> : <HeaderMobile />}

		{window.innerWidth <= 1140 && <MenuPanel />}

		<CartPanel />
		<main className='container'>{props.children}</main>
		<Footer />
	</div>
);

export default Layout;
