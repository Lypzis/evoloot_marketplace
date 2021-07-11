import React from 'react';
import { goToTop } from 'react-scrollable-anchor';

const BackToTopButton = props => {
	return (
		<div className='back-to-top'>
			{/* {isSticky && ( */}
			<button
				className='button button__black button__black--login back-to-top__button'
				onClick={() => goToTop()}>
				^
			</button>
			{/* )} */}
		</div>
	);
};

export default BackToTopButton;
