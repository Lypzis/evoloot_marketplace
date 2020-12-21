import React from 'react';
import { NavLink } from 'react-router-dom';

import sprite from '../assets/icons/sprite.svg';

const NavbarVertical = props => {
	return (
		<nav className='navbar-vertical'>
			<ul className='navbar-vertical__list navbar-vertical__list--profile'>
				<li className='navbar-vertical__list-item'>
					<NavLink
						to={`/me/settings`}
						className='paragraph navbar-vertical__link'
						activeClassName='navbar-vertical__link--active'>
						<svg className='button__icon '>
							<use xlinkHref={`${sprite}#icon-cog`}></use>
						</svg>
						{window.innerWidth > 560 && 'Settings'}
					</NavLink>
				</li>
				<li className='navbar-vertical__list-item'>
					<NavLink
						to={`/me/orders`}
						className='paragraph navbar-vertical__link'
						activeClassName='navbar-vertical__link--active'>
						<svg className='button__icon '>
							<use xlinkHref={`${sprite}#icon-dropbox`}></use>
						</svg>
						{window.innerWidth > 560 && 'My Orders'}
					</NavLink>
				</li>
				<li className='navbar-vertical__list-item'>
					<NavLink
						to={`/me/address`}
						className='paragraph navbar-vertical__link'
						activeClassName='navbar-vertical__link--active'>
						<svg className='button__icon '>
							<use xlinkHref={`${sprite}#icon-location2`}></use>
						</svg>
						{window.innerWidth > 560 && 'My Address'}
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default NavbarVertical;
