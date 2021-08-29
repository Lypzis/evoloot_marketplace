import React, { Fragment, memo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import BluredBackground from './BluredBackground';
import Navbar from './Navbar';
import { toggleMenu } from '../store/actions/menu';
import { NavLink } from 'react-router-dom';

// OBS: NOT a component, needs to be moved to container

const MenuPanel = props => {
	const [menuName, setMenuName] = useState('Menu');
	const menuState = useSelector(state => state.menu);
	const dispatch = useDispatch();

	const hideMenu = () => {
		changeMenuNameHeader();
		dispatch(toggleMenu());
	};

	const changeMenuNameHeader = (
		name = 'Menu',
		link = null,
		customFunction = null
	) => {
		if (link)
			setMenuName(
				<div className='navbar-vertical__submenu-title-box'>
					<button
						className='button button__black button__black--login back-to-top__button back-to-top__button--return'
						onClick={customFunction}>
						{'<'}
					</button>
					{/* width to 100% */}
					<NavLink
						to={link}
						className='paragraph navbar-vertical__link navbar-vertical__link--menu menu__link menu__link--title'
						onClick={hideMenu}>
						{name}
					</NavLink>
				</div>
			);
		else setMenuName(name);
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
								{menuName}
							</h3>

							<span className='navbar-line small-margin-top'></span>

							<Navbar
								vertical={true}
								hide={hideMenu}
								changeMenuName={changeMenuNameHeader}
							/>
						</div>
					</div>
				</div>
			)}
		</Fragment>
	);
};

export default memo(MenuPanel);
