import React from 'react';
//import Parse from 'parse';

import Layout from '../hoc/Layout';
import NavbarVertical from '../components/NavbarVertical';

const Orders = props => {
	return (
		<Layout>
			<div className='profile'>
				<NavbarVertical />
				<div className='auth-form'>
					<h2 className='heading-secondary heading-secondary--dark auth-form__title'>
						My Orders
					</h2>
				</div>
			</div>
		</Layout>
	);
};

export default Orders;
