import React, { Fragment, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import BluredBackground from './BluredBackground';
import Navbar from './Navbar';
import { toggleMenu } from '../store/actions/menu';

// OBS: NOT component, needs to be moved to container

const MenuPanel = props => {
	const menuState = useSelector(state => state.menu);
	const dispatch = useDispatch();

	const hideMenu = () => {
		dispatch(toggleMenu());
	};

	return (
		<Fragment>
			{menuState.toggle && (
				<div>
					<BluredBackground
						for={'menu-toggle'}
						className='blured--menu'
						menuState={menuState.toggle}
						hide={hideMenu}
					/>

					<div className='menu'>
						<div className='cart__panel'>
							<h3 className='heading-tertiary menu__header no-margin'>
								Menu
							</h3>

							<span className='navbar-line small-margin-top'></span>

							<Navbar vertical={true} />
						</div>
					</div>
				</div>
			)}
		</Fragment>
	);
};

export default memo(MenuPanel);
