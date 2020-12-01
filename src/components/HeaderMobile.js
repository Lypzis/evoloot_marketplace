/* eslint-disable jsx-a11y/accessible-emoji */
import React, { Fragment, memo, useContext, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import sprite from '../assets/icons/sprite.svg';
import logo from '../assets/images/logo.png';
import { setSearchText } from '../store/actions/search';
import { ClientContext } from '../context/clientContext';

const HeaderMobile = props => {
	const clientContext = useContext(ClientContext);
	const search = useSelector(state => state.search);
	const dispatch = useDispatch();
	const [callToActionOpen, setCallToActionOpen] = useState(true);

	const history = useHistory();
	const { pathname } = useLocation();

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

	const handleChangeCurrency = event => {
		clientContext.changeCurrency(event.target.value);
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
			{/* <BluredBackground for={'menu-toggle'} /> */}

			<header className='header'>
				{clientContext.pages && renderCallToAction()}
				<div className='header__body header__body--mobile'>
					<Link className='header__logo' to='/'>
						<img
							className='header__logo-image'
							src={logo}
							alt='Evoloot Marketplace Logo'
						/>
					</Link>
					<div className='header__buttons header__buttons--mobile'>
						<div className='header__user'>
							<div className='header__search-form  header__search-form--mobile'>
								<input
									autoFocus={pathname === '/search'}
									type='search'
									placeholder='Search'
									className='input input__search  input__search--mobile'
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
						</div>
					</div>
				</div>
			</header>

			<div className='header__mobile-currency-button'>
				<select
					className='input input--black input__select input__select--header'
					onChange={handleChangeCurrency}
					value={clientContext.currencyRate.code}>
					<option className='paragraph' value='USD'>
						&#127482;&#127480; USD
					</option>
					<option className='paragraph' value='CAD'>
						&#127464;&#127462; CAD
					</option>
					<option className='paragraph' value='EUR'>
						&#127466;&#127482; EUR
					</option>
					<option className='paragraph' value='GBP'>
						&#127468;&#127463; GBP
					</option>
				</select>
			</div>
		</Fragment>
	);
};

export default memo(HeaderMobile);
