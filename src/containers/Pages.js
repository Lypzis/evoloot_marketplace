import React, { useContext, useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { ClientContext } from '../context/clientContext';
import Layout from '../hoc/Layout';

const Pages = props => {
	const [htmlBody, setHtmlBody] = useState(null);
	const [currPage, setCurrPage] = useState(null);
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
					searchValue: /<h2>/gi,
					replaceValue:
						'<h3 class="heading-tertiary heading-tertiary--dark no-margin">',
				},
				{
					searchValue: /div/gi,
					replaceValue: 'p',
				},
				{
					searchValue: /<p/gi,
					replaceValue: '<p class="paragraph paragraph--black"',
				},
				{
					searchValue: /<p>/gi,
					replaceValue: '<p class="paragraph paragraph--black">',
				},
			];

			return replaceChain(body, replacements);
		},
		[replaceChain]
	);

	const setContent = useCallback(() => {
		const curr = clientContext.pages.find(
			policy => policy.handle === handle
		);

		const bodyFormatted = formatDescription(curr.body);

		setHtmlBody(bodyFormatted);
		setCurrPage(curr);
	}, [clientContext.pages, handle, formatDescription]);

	useEffect(() => {
		if (clientContext.pages) setContent();
	}, [clientContext.pages, setContent]);

	return (
		<Layout>
			<section className='home home--terms'>
				<div className='home__featured-section'>
					{currPage && (
						<>
							<h2 className='heading-secondary heading-secondary--dark small-margin-bottom'>
								{currPage.title}
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

export default Pages;
