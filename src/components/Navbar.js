import React, { useContext, useEffect } from 'react';

import { ClientContext } from '../context/clientContext';

const Navbar = props => {
	const clientContext = useContext(ClientContext);

	useEffect(() => {
		// now the magic can happen
		console.log(clientContext.client);
	}, []);

	return (
		<div className='navbar'>
			<p>My Navbar :D</p>
		</div>
	);
};

export default Navbar;
