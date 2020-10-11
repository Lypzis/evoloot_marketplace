import React, { memo } from 'react';

import Layout from '../../hoc/Layout';

const EventSchedule = props => {
	return (
		<Layout>
			<section className='home home--terms'>
				<div className='home__featured-section'>
					<h2 className='heading-secondary heading-secondary--dark'>
						Event Schedule
					</h2>

					<div className='home__featured home__featured--terms'>
						<p className='paragraph paragraph--black small-margin-bottom'>
							Here are the upcoming events that we are attending.
							This list will be updated regularly. Come visit us
							and check out all our cool stuff in person!
						</p>
						<h4 className='heading-fourtiary heading-fourtiary--dark small-margin-bottom'>
							Big Easy Con
						</h4>
						<p className='paragraph paragraph--black small-margin-bottom'>
							Date: Nov 1-3, 2019
						</p>
						<p className='paragraph paragraph--black small-margin-bottom'>
							Location: New Orleans, LA
						</p>
						<h4 className='heading-fourtiary heading-fourtiary--dark small-margin-bottom'>
							Alamo City Comic Con
						</h4>
						<p className='paragraph paragraph--black small-margin-bottom'>
							Date: Nov 1-3, 2019
						</p>
						<p className='paragraph paragraph--black small-margin-bottom'>
							Location: San Antonio, TX
						</p>
						<h4 className='heading-fourtiary heading-fourtiary--dark small-margin-bottom'>
							Kumoricon
						</h4>
						<p className='paragraph paragraph--black small-margin-bottom'>
							Date: Nov 15-17, 2019
						</p>
						<p className='paragraph paragraph--black small-margin-bottom'>
							Location: Portland, OR
						</p>
						<h4 className='heading-fourtiary heading-fourtiary--dark small-margin-bottom'>
							Calgary Expo Holiday Market
						</h4>
						<p className='paragraph paragraph--black small-margin-bottom'>
							Date: Nov 30, 2019
						</p>
						<p className='paragraph paragraph--black '>
							Location: Calgary, AB
						</p>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default memo(EventSchedule);
