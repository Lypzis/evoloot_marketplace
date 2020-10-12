import React, { Fragment, memo } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import sprite from '../assets/icons/sprite.svg';
import logo from '../assets/images/logo.png';
import { setSearchText } from '../store/actions/search';

const HeaderMobile = props => {
	const search = useSelector(state => state.search);
	const dispatch = useDispatch();

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

	return (
		<Fragment>
			{/* <BluredBackground for={'menu-toggle'} /> */}

			<header className='header'>
				{/* {callToAction && (
					// shall it have its own component ?
					<div className='call-to-action'>
						<p className='paragraph paragraph--black'>
							15% Off for otakuthon weekend! discount applied at
							checkout!
						</p>

						<button
							className='button button__small-circle'
							onClick={() => setCallToAction(false)}>
							<svg className='button__icon'>
								<use xlinkHref={`${sprite}#icon-cross`}></use>
							</svg>
						</button>
					</div>
				)} */}
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
		</Fragment>
	);
};

export default memo(HeaderMobile);
