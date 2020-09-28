import React from 'react';
import { NavLink } from 'react-router-dom';

const NavbarVertical = props => {
	return (
		<nav className='navbar-vertical'>
			<ul className='navbar-vertical__list'>
				<li className='navbar-vertical__list-item'>
					<NavLink
						to={`/me/settings`}
						className='paragraph navbar-vertical__link'
						activeClassName='navbar__link--active'>
						Settings
					</NavLink>
				</li>
				<li className='navbar-vertical__list-item'>
					<NavLink
						to={`/me/orders`}
						className='paragraph navbar-vertical__link'
						activeClassName='navbar__link--active'>
						My Orders
					</NavLink>
				</li>
				<li className='navbar-vertical__list-item'>
					<NavLink
						to={`/me/address`}
						className='paragraph navbar-vertical__link'
						activeClassName='navbar__link--active'>
						My Address
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default NavbarVertical;
