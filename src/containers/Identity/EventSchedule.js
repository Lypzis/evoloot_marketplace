import React, { memo } from 'react';

import Layout from '../../hoc/Layout';

const EventSchedule = props => {
	return (
		<Layout>
			<div className='home__featured-section'>
				<h2 className='heading-secondary heading-secondary--dark'>
					Event Schedule
				</h2>

				<div className='home__featured'>
					<p className='paragraph paragraph--black'>
						Here are the upcoming events that we are attending. This
						list will be updated regularly. Come visit us and check
						out all our cool stuff in person! Big Easy Con Date: Nov
						1-3, 2019 Location: New Orleans, LA Alamo City Comic Con
						Date: Nov 1-3, 2019 Location: San Antonio, TX Kumoricon
						Date: Nov 15-17, 2019 Location: Portland, OR Calgary
						Expo Holiday Market Date: Nov 30, 2019 Location:
						Calgary, AB
					</p>
				</div>
			</div>
		</Layout>
	);
};

export default memo(EventSchedule);
