import React, {
	Fragment,
	memo,
	useContext,
	useEffect,
	useCallback,
	useState,
} from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import { ClientContext } from '../context/clientContext';
import sprite from '../assets/icons/sprite.svg';
import { AuthContext } from '../context/authContext';

const Navbar = props => {
	const authContext = useContext(AuthContext);
	const [navTitles, setNavTitles] = useState([]);
	const clientContext = useContext(ClientContext);
	const { collections } = clientContext;

	const getCollections = useCallback(async () => {
		if (collections) {
			const navTitles = collections.map(col => {
				return { title: col.title, handle: col.handle };
			});

			// const navTitlesFormated = nestMenus(navTitles);

			// setNavTitles(navTitlesFormated);

			setNavTitles(navTitles);
		}
	}, [collections]);

	// const nestMenus = (menu, currLevel = 1) => {
	// 	const submenus = [];

	// 	menu.forEach(el => {
	// 		const isASubMenu = el.title.split('-');

	// 		el.children = [];

	// 		if (isASubMenu.length > currLevel) {
	// 			el.parents = [];
	// 			el.toDelete = true;

	// 			isASubMenu.slice(0, isASubMenu.length - 1).forEach(submenu => {
	// 				el.parents.push(submenu.trim());
	// 			});
	// 		}
	// 	});

	// 	submenus.forEach(el => {
	// 		el.title = el.parents[el.length - 1];
	// 	});

	// 	menu.forEach(el => {
	// 		if (el.parents) {
	// 			submenus.push(el);
	// 		}
	// 	});

	// 	for (let i = 0; i < submenus.length; ++i) {
	// 		for (let j = 0; j < submenus[i].parents.length; ++j) {
	// 			for (let k = 0; k < menu.length; ++k) {
	// 				if (menu[k].title === submenus[i].parents[j]) {
	// 					const names = submenus[i].title.split('-');
	// 					submenus[i].title = names[names.length - 1].trim();
	// 					menu[k].children.push(submenus[i]);
	// 				}
	// 			}
	// 		}
	// 	}

	// 	return menu.filter(el => !el.toDelete);
	// };

	const history = useHistory();

	const logout = async () => {
		try {
			await authContext.logout();
		} catch (err) {
			// connection error
			console.log('D:', err);
		}
	};

	useEffect(() => {
		getCollections();
	}, [clientContext, getCollections]);

	// const showChildren = event => {
	// 	const { text } = event.target;

	// 	const theOne = navTitles.find(
	// 		el => el.title === text && el.children.length > 0
	// 	);

	// 	console.log(theOne);
	// };

	const generateMenu = () => {
		return navTitles.map((navTitle, index) => {
			return (
				<li className='navbar__list-item' key={index}>
					{/* onMouseOver={event => showChildren(event)} */}
					<NavLink
						to={`/collection/${navTitle.handle}`}
						className={`paragraph  ${
							props.vertical
								? ' navbar-vertical__link navbar-vertical__link--menu menu__link'
								: ' navbar__link '
						}`}
						activeClassName={
							props.vertical
								? ' navbar-vertical__link--active menu__link'
								: ' navbar__link--active '
						}>
						{navTitle.title}
					</NavLink>
				</li>
			);
		});
	};

	return (
		<Fragment>
			<span className='navbar-line'></span>
			{navTitles.length > 0 && (
				<nav
					className={` ${
						props.vertical
							? 'navbar-vertical navbar-vertical--no-background'
							: 'navbar'
					}`}>
					<ul
						className={` ${
							props.vertical
								? 'navbar-vertical__list'
								: 'navbar__list'
						}`}>
						{generateMenu()}
						<span className='navbar-line navbar-line--thicc'></span>
						{props.vertical && (
							<li className='navbar-vertical__list-item navbar-vertical__list-item--menu'>
								{!authContext.customerToken ? (
									<div className='header__loged-out'>
										<button
											className='button button__black button__black--account button__black--account button__black--account-menu-panel '
											onClick={() =>
												history.push('/login')
											}>
											<svg className='button__icon'>
												<use
													xlinkHref={`${sprite}#icon-profile`}></use>
											</svg>
											<p className='paragraph menu__link'>
												Account
											</p>
										</button>
										{/* <button
											className='button button__black button__black--login'
											onClick={() =>
												history.push('/login')
											}>
											<svg className='button__icon'>
												<use
													xlinkHref={`${sprite}#icon-enter`}></use>
											</svg>
											<p className='paragraph'>log in</p>
										</button>
										<button
											className='button button__black button__black--signup'
											onClick={() =>
												history.push('/signup')
											}>
											<svg className='button__icon'>
												<use
													xlinkHref={`${sprite}#icon-clipboard`}></use>
											</svg>
											<p className='paragraph'>sign up</p>
										</button> */}
									</div>
								) : (
									<div className='header__loged-out'>
										<button
											className='button button__black button__black--profile'
											onClick={() => history.push('/me')}>
											<svg className='button__icon'>
												<use
													xlinkHref={`${sprite}#icon-profile`}></use>
											</svg>
											<p className='paragraph menu__link'>
												My Account
											</p>
										</button>
										<button
											className='button button__black button__black--logout'
											onClick={logout}>
											<svg className='button__icon'>
												<use
													xlinkHref={`${sprite}#icon-exit`}></use>
											</svg>
											<p className='paragraph menu__link'>
												Log out
											</p>
										</button>
									</div>
								)}
							</li>
						)}
					</ul>
				</nav>
			)}
		</Fragment>
	);
};

export default memo(Navbar);
