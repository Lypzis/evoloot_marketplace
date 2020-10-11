import React from 'react';

const BluredBackground = props => (
	<label
		className={`blured ${props.className ? props.className : ''}`}
		htmlFor={props.for}></label>
);

export default BluredBackground;
