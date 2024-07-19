import React, { useContext, useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { ClientContext } from '../context/clientContext';
import Layout from '../hoc/Layout';

const Policies = props => {
	const [htmlBody, setHtmlBody] = useState(null);
	const [currPolicy, setCurrPolicy] = useState(null);
	const { handle } = useParams();
	const clientContext = useContext(ClientContext);

	/**
	 * Sets the page content based on the current page
	 * 'handle' param.
	 */
	const setContent = useCallback(() => {
		const curr = clientContext.shopPolicies.find(
			policy => policy.handle === handle
		);

		setHtmlBody(curr.body);
		setCurrPolicy(curr);
	}, [clientContext.shopPolicies, handle]);

	useEffect(() => {
		if (clientContext.shopPolicies) setContent();
	}, [clientContext.shopPolicies, setContent]);

	return (
		<Layout>
			<section className='home home--terms'>
				<div className='home__featured-section'>
					{currPolicy && (
						<>
							<h2 className='heading-secondary heading-secondary--dark medium-margin-bottom'>
								{currPolicy.title}
							</h2>

							<div className='home__featured home__featured--terms'>
								<div
									className='card__description-box-description'
									dangerouslySetInnerHTML={{
										__html: htmlBody,
									}}></div>
							</div>
						</>
					)}
				</div>
			</section>
		</Layout>
	);
};

export default Policies;
