import React, { Fragment } from 'react';

const BluredBackground = props => {
	return (
		<Fragment>
			{props.menuState && (
				<label className='blured' onClick={props.hide}></label>
			)}
		</Fragment>
	);
};

export default BluredBackground;
