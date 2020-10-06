import React, { memo } from 'react';

import Layout from '../../hoc/Layout';

const About = props => {
	return (
		<Layout>
			<div className='home__featured-section'>
				<h2 className='heading-secondary heading-secondary--dark'>
					What's Evoloot?
				</h2>

				<div className='home__featured'>
					<p className='paragraph paragraph--black'>
						Evoloot Marketplace is a small company of dedicated
						people who want to bring North Americans fan merchandise
						for video games and anime from other countries,
						primarily Japan. We pride ourselves on dealing only with
						official and authentic merchandise that real fans will
						appreciate. We're fans too, and quality matters a great
						deal to us. We operate primarily out of Alberta, Canada,
						but we're are growing quickly. We also frequent many
						conventions across North America to bring our
						merchandise to people who prefer to shop in person. We
						deliver wherever possible, we know that fandom has no
						limits. Our team is comprised of staff and volunteers
						who are big otaku themselves. We try to know about all
						the best media, but there is always more to know. We
						carefully select our import goods using our expertise,
						but we'd be happy to try and get almost anything for our
						fellow fans. We take great care in packing and shipping
						too; we know the quality of the collectibles is
						important. Check us out on most social media or drop us
						a line using the contact info at the bottom of this
						page.
					</p>
				</div>
			</div>
		</Layout>
	);
};

export default memo(About);
