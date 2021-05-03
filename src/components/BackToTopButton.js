import React, { useEffect, useState, useRef, useCallback } from 'react';
import { goToTop } from 'react-scrollable-anchor';

const BackToTopButton = props => {
	// Global ?

	// const [isSticky, setSticky] = useState(false);
	// const element = useRef(null);

	// /**
	//  * When the user scrolls, it checks whether window.scrollY is superior
	//  * or not to stickyRef.current.getBoundingClientRect().bottom and then
	//  * handles the isSticky state consequently
	//  */
	// const handleScroll = useCallback(() => {
	// 	if (element.current)
	// 		window.scrollY / 3 > element.current.getBoundingClientRect().bottom
	// 			? setSticky(true)
	// 			: setSticky(false);
	// }, []);

	// useEffect(() => {
	// 	window.addEventListener('scroll', handleScroll);

	// 	return () => {
	// 		window.removeEventListener('scroll', () => handleScroll());
	// 	};
	// }, [handleScroll]);

	return (
		<div class='back-to-top'>
			{/* {isSticky && ( */}
			<button
				class='button button__black button__black--login back-to-top__button'
				onClick={() => goToTop()}>
				^
			</button>
			{/* )} */}
		</div>
	);
};

export default BackToTopButton;
