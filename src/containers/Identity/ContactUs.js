import React, { memo } from 'react';

import Layout from '../../hoc/Layout';

const ContactUs = props => {
	return (
		<Layout>
			<section className='home home--terms'>
				<div className='home__featured-section'>
					<h2 className='heading-secondary heading-secondary--dark'>
						Contact Us
					</h2>

					<div className='home__featured home__featured--terms'>
						<p className='paragraph paragraph--black'>
							You can contact us using any of the social media
							links at the bottom of the page. You can also
							complete the following form (may take a second to
							load) and we will contact you shortly. If you'd
							rather contact us by mail you can send it to:{' '}
						</p>
						<p className='paragraph paragraph--black'>
							PO Box 49023 7740 18 St SE Calgary, AB T2C 3W5
						</p>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default memo(ContactUs);
