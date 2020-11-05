import React, { memo } from 'react';

const Description = ({ description, isThereADescription }) => {
	if (!isThereADescription) return null;

	return (
		<div className='card product__card product__card--description'>
			<div className='card__details'>
				<h3 className='heading-tertiary small-margin'>Description:</h3>

				<div className='card__description-box'>
					<div
						className='card__description-box-description'
						dangerouslySetInnerHTML={{
							__html: description,
						}}></div>
				</div>
			</div>
		</div>
	);
};

export default memo(Description);
