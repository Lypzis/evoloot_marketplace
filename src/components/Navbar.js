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
	const history = useHistory();

	const getCollections = useCallback(async () => {
		if (collections) {
			const navTitles = collections.map(col => {
				return { title: col.title, handle: col.handle, tags: col.tags };
			});

			setNavTitles(navTitles);
		}
	}, [collections]);

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

	const generateMenu = () => {
		return navTitles.map((navTitle, index) => {
			return (
				<li className='navbar__list-item' key={index}>
					{props.vertical ? (
						<div className='navbar__title-container'>
							<NavLink
								to={`/collection/${navTitle.handle}`}
								className='paragraph navbar-vertical__link navbar-vertical__link--menu menu__link'
								activeClassName=' navbar-vertical__link--active menu__link'>
								{navTitle.title}
							</NavLink>
							{/* <button>{'>'}</button> */}
							<ol className='navbar__link-hidden-list'>
								{navTitle.tags.map(tag => {
									return (
										<li
											key={tag}
											className='navbar__link-hidden-list-item'>
											<NavLink
												to={`/collection/${navTitle.handle}?tag=${tag}`}
												className={
													'paragraph navbar__link'
												}>
												{tag}
											</NavLink>
										</li>
									);
								})}
							</ol>
						</div>
					) : (
						<Fragment>
							<NavLink
								to={`/collection/${navTitle.handle}`}
								className='paragraph  navbar__link '
								activeClassName=' navbar__link--active '>
								{navTitle.title}
							</NavLink>
							{/* little button on vertical to open submenus */}
							<ol className='navbar__link-hidden-list'>
								{navTitle.tags.map(tag => {
									return (
										<li
											key={tag}
											className='navbar__link-hidden-list-item'>
											<NavLink
												to={`/collection/${navTitle.handle}?tag=${tag}`}
												className={
													'paragraph navbar__link'
												}>
												{tag}
											</NavLink>
										</li>
									);
								})}
							</ol>
						</Fragment>
					)}
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
