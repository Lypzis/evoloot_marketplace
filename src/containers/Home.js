import React, { useState } from 'react';

import Layout from '../hoc/Layout';

const Home = props => {
	// TEMP
	const [callToAction, setCallToAction] = useState(true); // set with something else later on
	const [loged, setLoged] = useState(false);

	return (
		<Layout callToAction={callToAction} loged={loged}>
			<section className='home'>
				<p className='paragraph'> Home Contentttttttttttt </p>
			</section>
		</Layout>
	);
};

export default Home;
