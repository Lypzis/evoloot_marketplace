import React from 'react';
import { css } from '@emotion/core';
import BarLoader from 'react-spinners/BarLoader';

const LoadingBar = props => {
	const override = css`
		margin: auto;
		border-radius: 5rem;
	`;

	return (
		<div style={{ marginTop: props.marginTop ? props.marginTop : 0 }}>
			<div className='sweet-loading'>
				<BarLoader
					css={override}
					height={props.height ? props.height : 5}
					width={props.width ? props.width : 300}
					color={props.color ? props.color : '#54cd00'}
					loading={props.loading}
				/>
			</div>
		</div>
	);
};

export default LoadingBar;
