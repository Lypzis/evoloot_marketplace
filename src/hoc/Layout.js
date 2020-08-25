import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

// turn calltoaction into context
const Layout = props => (
	<div className='container'>
		<Header callToAction={props.callToAction} loged={props.loged} />
		{props.children}
		<Footer />
	</div>
);

export default Layout;
