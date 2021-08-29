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
	const [candidateNewMenu, setCandidateNewMenu] = useState([]);
	const [menu, setMenu] = useState([]);
	const clientContext = useContext(ClientContext);
	const { collections } = clientContext;
	const history = useHistory();
	const { vertical, hide, changeMenuName } = props;

	const getCollections = useCallback(() => {
		if (collections) {
			const navTitles = collections.map(col => {
				return { title: col.title, handle: col.handle, tags: col.tags };
			});

			setNavTitles(navTitles);
		}
	}, [collections]);

	const logout = async () => {
		try {
			props.hide();
			await authContext.logout();
		} catch (err) {
			// connection error
			console.log('D:', err);
		}
	};

	const goToMyAccount = async () => {
		props.hide();
		history.push('/me');
	};

	const turnToMenu = useCallback(() => {
		getCollections();
		changeMenuName();
	}, [getCollections, changeMenuName]);

	const turnToSubMenu = useCallback(
		menuSelected => {
			changeMenuName(
				menuSelected.title,
				`/collection/${menuSelected.handle}`,
				turnToMenu
			);

			const generatedMenu = menuSelected.tags.map((tag, index) => (
				<li className='navbar__list-item' key={index}>
					<div className='navbar__title-container'>
						<NavLink
							to={`/collection/${menuSelected.handle}?tag=${tag}`}
							className='paragraph navbar-vertical__link navbar-vertical__link--menu menu__link'
							onClick={hide}>
							{tag}
						</NavLink>
					</div>
				</li>
			));

			setCandidateNewMenu(generatedMenu);
		},
		[changeMenuName, hide, turnToMenu]
	);

	// menu needs to become state
	const generateMenu = useCallback(
		(menu = navTitles) => {
			const generatedMenu = menu.map((navTitle, index) => {
				return (
					<li className='navbar__list-item' key={index}>
						{vertical ? (
							<div className='navbar__title-container'>
								{navTitle.tags.length > 0 ? (
									<p
										className='paragraph navbar-vertical__link navbar-vertical__link--menu menu__link'
										onClick={() => turnToSubMenu(navTitle)}>
										{navTitle.title}
									</p>
								) : (
									<NavLink
										to={`/collection/${navTitle.handle}`}
										className='paragraph navbar-vertical__link navbar-vertical__link--menu menu__link'
										activeClassName=' navbar-vertical__link--active menu__link'
										onClick={hide}>
										{navTitle.title}
									</NavLink>
								)}
								{/* <button>{'>'}</button> */}
								<ol className='navbar__link-hidden-list'>
									{navTitle.tags.map(tag => {
										return (
											<li
												key={tag}
												className='navbar__link-hidden-list-item'
												onClick={hide}>
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

			setMenu(generatedMenu);
		},
		[navTitles, vertical, hide, turnToSubMenu]
	);

	useEffect(() => {
		getCollections();
	}, [clientContext, getCollections]);

	useEffect(() => {
		generateMenu();
	}, [generateMenu]);

	useEffect(() => {
		setMenu(candidateNewMenu);
	}, [candidateNewMenu]);

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
						{menu}
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
											onClick={goToMyAccount}>
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
