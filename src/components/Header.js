/* eslint-disable jsx-a11y/accessible-emoji */
import React, { Fragment, memo, useContext, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Navbar from './Navbar';
import sprite from '../assets/icons/sprite.svg';
import logo from '../assets/images/logo.png';
import { AuthContext } from '../context/authContext';
import { ClientContext } from '../context/clientContext';
import { setSearchText } from '../store/actions/search';
import Select from '../components/Select';
import CartDropdown from '../components/CartDropdown';

const Header = props => {
	const authContext = useContext(AuthContext);
	const clientContext = useContext(ClientContext);
	const checkout = useSelector(state => state.checkout);
	const search = useSelector(state => state.search);
	const dispatch = useDispatch();
	const [callToActionOpen, setCallToActionOpen] = useState(true);

	const history = useHistory();
	const { pathname } = useLocation();

	const logout = async () => {
		try {
			await authContext.logout();
		} catch (err) {
			// connection error
			console.log('D:', err);
		}
	};

	/**
	 * On text change, set the current value to 'searchInput'
	 * @param {String} text text input value
	 */
	const handleSearchTextChanged = event => {
		event.preventDefault();

		dispatch(setSearchText(event.target.value));

		// or go to home?
		if (event.target.value.trim() === '') history.goBack();
		else if (pathname === '/search') history.replace('/search');
		else history.push('/search');
	};

	const handleChangeCurrency = currency => {
		clientContext.changeCurrency(currency);
	};

	const renderCallToAction = () => {
		const callToAction = clientContext.pages.filter(
			page => page.title === 'Call-To-Action'
		);

		if (callToAction !== undefined) {
			return (
				<Fragment>
					{callToActionOpen && (
						<div className='call-to-action'>
							<div
								className='card__description-box-description'
								dangerouslySetInnerHTML={{
									__html: callToAction[0].body,
								}}></div>

							<button
								className='button button__small-circle'
								onClick={() => setCallToActionOpen(false)}>
								<svg className='button__icon'>
									<use
										xlinkHref={`${sprite}#icon-cross`}></use>
								</svg>
							</button>
						</div>
					)}
				</Fragment>
			);
		}
	};

	return (
		<Fragment>
			<header className='header'>
				{clientContext.pages && renderCallToAction()}

				<div className='header__body'>
					<Link className='header__logo' to='/'>
						<img
							className='header__logo-image'
							src={logo}
							alt='Evoloot Marketplace Logo'
						/>
					</Link>
					<div className='header__buttons'>
						<div className='header__container'>
							<div className='header__search-form'>
								<input
									autoFocus={pathname === '/search'}
									type='search'
									placeholder='Search'
									className='input input__search'
									value={search.searchText}
									onChange={handleSearchTextChanged}
								/>
								<button
									type='submit'
									className='button button__search'>
									<svg className='button__icon'>
										<use
											xlinkHref={`${sprite}#icon-search`}></use>
									</svg>
								</button>
							</div>

							<div className='header__user'>
								<div className='header__loged-out'>
									<button
										className='button button__black button__black--cart'
										onClick={() => history.push('/cart')}>
										<svg className='button__icon'>
											<use
												xlinkHref={`${sprite}#icon-cart`}></use>
										</svg>
										<div className='button__quantity'>
											<p className='paragraph'>
												{checkout.lineItems.length > 0
													? checkout.lineItems
															.map(
																el =>
																	el.quantity
															)
															.reduce(
																(a, b) => a + b
															)
													: 0}
											</p>
										</div>
									</button>
									<CartDropdown />
								</div>
								<div className='header__loged-out'>
									<Select
										onOptionClick={handleChangeCurrency}
										currentOption={
											clientContext.currencyRate.code
										}
									/>
								</div>
								{!authContext.customerToken ? (
									<div className='header__loged-out'>
										<button
											className='button button__black button__black--account'
											onClick={() =>
												history.push('/login')
											}>
											<svg className='button__icon'>
												<use
													xlinkHref={`${sprite}#icon-profile`}></use>
											</svg>
											<p className='paragraph'>Account</p>
										</button>
										{/* <button
										className='button button__black button__black--login'
										onClick={() => history.push('/login')}>
										<svg className='button__icon'>
											<use
												xlinkHref={`${sprite}#icon-enter`}></use>
										</svg>
										<p className='paragraph'>log in</p>
									</button>
									<button
										className='button button__black button__black--signup'
										onClick={() => history.push('/signup')}>
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
											<p className='paragraph'>
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
											<p className='paragraph'>Log out</p>
										</button>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
				<Navbar />
			</header>
		</Fragment>
	);
};

export default memo(Header);
