import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import sprite from '../assets/icons/sprite.svg';
import logo from '../assets/images/logo.png';

// TO-DO: ALTERNATIVE FOOTER AT ~730 WINDOW WIDTH

const Footer = props => (
	<footer className='footer'>
		<div className='footer__body'>
			<div className='footer__links'>
				<div className='footer__links-partition'>
					<a className='footer__logo' href='/'>
						<img
							className='header__logo-image'
							src={logo}
							alt='Evoloot Marketplace Logo'
						/>
					</a>
				</div>

				<div className='footer__links-partition'>
					<h3 className='heading-fourtiary'>Who We Are</h3>

					<Link to='/about' className='footer__link'>
						<p className='paragraph'>About Us</p>
					</Link>

					<Link
						to='/our-promise-to-our-customers'
						className='footer__link'>
						<p className='paragraph'>Our Promise</p>
					</Link>

					<Link to='/volunteer-application' className='footer__link'>
						<p className='paragraph'>Volunteer Application</p>
					</Link>

					<Link to='/contact-us' className='footer__link'>
						<p className='paragraph'>Contact Us</p>
					</Link>

					<Link to='/event-schedule' className='footer__link'>
						<p className='paragraph'>Event Schedule</p>
					</Link>
				</div>
				<div className='footer__links-partition'>
					<h3 className='heading-fourtiary'>The Details</h3>

					<Link to='/refund-policy' className='footer__link'>
						<p className='paragraph'>Refunds</p>
					</Link>

					<Link to='/privacy-policy' className='footer__link'>
						<p className='paragraph'>Privacy</p>
					</Link>

					<Link to='/terms-of-service' className='footer__link'>
						<p className='paragraph'>Service</p>
					</Link>
				</div>
				<div className='footer__links-partition'>
					<h3 className='heading-fourtiary'>Social Media Thingies</h3>

					<div className='footer__icons'>
						<button
							className='button button__black button__black--small-circle'
							onClick={() =>
								window.open(
									'https://www.facebook.com/evolootmarketplace'
								)
							}>
							<svg className='button__icon'>
								<use
									xlinkHref={`${sprite}#icon-facebook`}></use>
							</svg>
						</button>
						<button
							className='button button__black button__black--small-circle'
							onClick={() =>
								window.open(
									'https://twitter.com/evolootofficial'
								)
							}>
							<svg className='button__icon'>
								<use xlinkHref={`${sprite}#icon-twitter`}></use>
							</svg>
						</button>
						<button
							className='button button__black button__black--small-circle'
							onClick={() =>
								window.open(
									'https://www.instagram.com/evolootmarketplace/'
								)
							}>
							<svg className='button__icon'>
								<use
									xlinkHref={`${sprite}#icon-instagram`}></use>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
		<span className='navbar-line'></span>
		<div className='footer__copyright'>
			<p className='paragraph'>
				Created with{' '}
				<span role='img' aria-label={'heart'}>
					&#128150;
				</span>{' '}
				by{' '}
				<a
					className='paragraph footer__author'
					href='https://lypzis.tk'
					target='_blank'
					rel='noopener noreferrer'>
					Lypzis
				</a>
				.
			</p>
			<p className='paragraph'>
				© Evoloot Marketplace 2020. All rights reserved.
			</p>
		</div>
	</footer>
);

export default memo(Footer);
