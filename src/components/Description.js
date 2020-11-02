import React, { memo, useEffect, useCallback, useState } from 'react';

const Description = ({ description, isThereADescription }) => {
	const [formatedDescription, setFormatedDescription] = useState();

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

	const formatDescription = useCallback(() => {
		const replacements = [
			{
				searchValue: /<ul>/gi,
				replaceValue: '<ul class="product__description-list">',
			},
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
			{
				searchValue: /<li>/gi,
				replaceValue: '<li class="product__description-list-item">',
			},
		];

		const newDescription = replaceChain(description, replacements);

		setFormatedDescription(newDescription);
	}, [description, replaceChain]);

	useEffect(() => {
		formatDescription();
	}, [formatDescription]);

	if (!isThereADescription) return null;

	return (
		<div className='card product__card product__card--description'>
			<div className='card__details'>
				<h3 className='heading-tertiary small-margin'>Description:</h3>

				<div className='card__description-box'>
					<div
						dangerouslySetInnerHTML={{
							__html: formatedDescription,
						}}></div>
				</div>
			</div>
		</div>
	);
};

export default memo(Description);
