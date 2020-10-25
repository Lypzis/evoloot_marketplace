import React, { useContext, useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { ClientContext } from '../context/clientContext';
import Layout from '../hoc/Layout';

const Policies = props => {
	const [htmlBody, setHtmlBody] = useState(null);
	const [currPolicy, setCurrPolicy] = useState(null);
	const { handle } = useParams();
	const clientContext = useContext(ClientContext);

	const replaceChain = useCallback((string, replacements) => {
		if (replacements.length > 0) {
			return replaceChain(
				string.replace(
					replacements[0].searchValue,
					replacements[0].replaceValue
				),
				replacements.slice(1)
			);
		}

		return string;
	}, []);

	const formatDescription = useCallback(
		body => {
			const replacements = [
				{
					searchValue: /<p>/gi,
					replaceValue: '<p class="paragraph paragraph--black">',
				},
				{
					searchValue: /<b>/gi,
					replaceValue: '<p class="paragraph paragraph--black">',
				},
				{
					searchValue: /strong/gi,
					replaceValue: 'p',
				},
			];

			return replaceChain(body, replacements);
		},
		[replaceChain]
	);

	const setContent = useCallback(() => {
		const curr = clientContext.shopPolicies.find(
			policy => policy.handle === handle
		);
		const bodyFormatted = formatDescription(curr.body);

		setHtmlBody(bodyFormatted);
		setCurrPolicy(curr);
	}, [clientContext.shopPolicies, handle, formatDescription]);

	useEffect(() => {
		if (clientContext.shopPolicies) setContent();
	}, [clientContext.shopPolicies, setContent]);

	return (
		<Layout>
			<section className='home home--terms'>
				<div className='home__featured-section'>
					{currPolicy && (
						<>
							<h2 className='heading-secondary heading-secondary--dark small-margin-bottom'>
								{currPolicy.title}
							</h2>

							<div className='home__featured home__featured--terms'>
								<div
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
