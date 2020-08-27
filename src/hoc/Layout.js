import React, { Fragment } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

// turn calltoaction into context
const Layout = props => (
	<Fragment>
		<Header callToAction={props.callToAction} loged={props.loged} />
		<div className='container'>{props.children}</div>
		<Footer />
	</Fragment>
);

export default Layout;
