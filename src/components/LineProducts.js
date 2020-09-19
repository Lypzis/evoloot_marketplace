import React, { memo } from 'react';
import { useSelector } from 'react-redux';

import LineProduct from './LineProduct';

const LineProducts = props => {
	const checkout = useSelector(state => state.checkout);

	return (
		<ul>
			{checkout.lineItems.length > 0 ? (
				checkout.lineItems.map(item => (
					<LineProduct
						key={item.id}
						product={item}
						small={props.small}
						big={props.big}
					/>
				))
			) : (
				<h3 className='heading-tertiary heading-tertiary--dark'>
					-- My cart is empty. --
				</h3>
			)}
		</ul>
	);
};

export default memo(LineProducts);
