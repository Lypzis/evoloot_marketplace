import React, { Fragment, memo, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Navbar from './Navbar';
import sprite from '../assets/icons/sprite.svg';
import logo from '../assets/images/logo.png';
import { AuthContext } from '../context/authContext';

const Header = props => {
	const authContext = useContext(AuthContext);

	const history = useHistory();

	return (
		<Fragment>
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
				<div className='header__body'>
					<Link className='header__logo' to='/'>
						<img
							className='header__logo-image'
							src={logo}
							alt='Evoloot Marketplace Logo'
						/>
					</Link>
					<div className='header__buttons'>
						<div className='header__user'>
							<form className='header__search-form'>
								<input
									type='search'
									placeholder='Search'
									className='input'
								/>
								<button
									type='submit'
									className='button button__search'>
									<svg className='button__icon'>
										<use
											xlinkHref={`${sprite}#icon-search`}></use>
									</svg>
								</button>
							</form>
							{!authContext.currentUser ? (
								<div className='header__loged-out'>
									<button
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
									</button>
								</div>
							) : (
								<div className='header__loged-out'>
									<button
										className='button button__black button__black--profile'
										onClick={() =>
											console.log('My Profile')
										}>
										<svg className='button__icon'>
											<use
												xlinkHref={`${sprite}#icon-profile`}></use>
										</svg>
										<p className='paragraph'>Profile</p>
									</button>
									<button
										className='button button__black button__black--logout'
										onClick={() => console.log('logout')}>
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
				<Navbar />
			</header>
		</Fragment>
	);
};

export default memo(Header);
