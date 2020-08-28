import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

// turn calltoaction into context
const Layout = props => (
	<div className='container__parent'>
		<Header callToAction={props.callToAction} loged={props.loged} />
		<main className='container'>{props.children}</main>
		<Footer />
	</div>
);

export default Layout;
