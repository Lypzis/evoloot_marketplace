import React, { memo } from 'react';

import Layout from '../../hoc/Layout';

const VolunteerApplication = props => {
	return (
		<Layout>
			<div className='home__featured-section'>
				<h2 className='heading-secondary heading-secondary--dark'>
					Volunteer Application
				</h2>

				<div className='home__featured'>
					<p className='paragraph paragraph--black'></p>
				</div>
			</div>
		</Layout>
	);
};

export default memo(VolunteerApplication);
