import React, { memo } from 'react';

import Layout from '../../hoc/Layout';

const Promise = props => {
	return (
		<Layout>
			<div className='home__featured-section'>
				<h2 className='heading-secondary heading-secondary--dark'>
					Our Promise to our Customers
				</h2>

				<div className='home__featured'>
					<p className='paragraph paragraph--black'>
						Authenticity Guaranteed We pride ourselves on only
						dealing with officially licensed merchandise. We do so
						by carefully selecting our suppliers and distributors.
						That way you don't have to worry about the authenticity
						of our products, it's guaranteed official merchandise.
						Fans First We're fans too here at Evoloot, so we know
						what to look for when sourcing our products. We want
						everyone to be able to show off their true fanaticism
						with great loot! We are also welcome to suggestions and
						requests because we want to put fans first. Packing
						Quality We know that the quality of our product is
						essential, so we pack all our products carefully to try
						and avoid damage in shipping. We do so quickly to avoid
						long wait times, and we even pass along promotional
						items from our suppliers. Customer Care We are friendly
						and caring people here at Evoloot Marketplace, and that
						doesn't change however we talk to our customers. Whether
						at conventions in person, over the phone, or online, we
						will be friendly, and courteous to all our customers!
					</p>
				</div>
			</div>
		</Layout>
	);
};

export default memo(Promise);
