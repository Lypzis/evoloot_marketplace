import React, { Fragment, memo } from 'react';
import { NavLink } from 'react-router-dom';

import sprite from '../assets/icons/sprite.svg';
import LineProducts from './LineProducts';
import BluredBackground from './BluredBackground';
import Navbar from './Navbar';

const MenuPanel = props => {
	return (
		<Fragment>
			<input
				defaultChecked={true}
				type='checkbox'
				className='menu__checkbox'
				id='menu-toggle'
			/>

			<label
				htmlFor='menu-toggle'
				className='button button__black button__black--login menu__button'>
				<svg className='button__icon menu__button-icon'>
					<use xlinkHref={`${sprite}#icon-menu`}></use>
				</svg>
			</label>

			<BluredBackground for={'menu-toggle'} className='blured--menu' />

			<div className='menu'>
				<div className='cart__panel'>
					<h3 className='heading-tertiary heading-tertiary no-margin'>
						Menu
					</h3>

					<span className='navbar-line small-margin-top'></span>

					<Navbar vertical={true} />
				</div>
			</div>
		</Fragment>
	);
};

export default memo(MenuPanel);
