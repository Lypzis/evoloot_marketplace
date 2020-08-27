import React, { useState } from 'react';

import Layout from '../hoc/Layout';

const Home = props => {
	// TEMP
	const [callToAction, setCallToAction] = useState(true); // set with something else later on
	const [loged, setLoged] = useState(false);

	return (
		<Layout callToAction={callToAction} loged={loged}>
			<main className='home'>Home Content</main>
		</Layout>
	);
};

export default Home;
