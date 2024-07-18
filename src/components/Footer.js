import React, { memo, useContext } from 'react';
import { Link } from 'react-router-dom';

import sprite from '../assets/icons/sprite.svg';
import logo from '../assets/images/logo.png';
import { ClientContext } from '../context/clientContext';

// TO-DO: ALTERNATIVE FOOTER AT ~730 WINDOW WIDTH

const Footer = props => {
	const clientContext = useContext(ClientContext);

	return (
		<footer className='footer'>
			<div className='footer__body'>
				<div className='footer__links'>
					<div className='footer__links-partition'>
						<Link className='footer__logo' to='/'>
							<img
								className='header__logo-image'
								src={logo}
								alt='Evoloot Marketplace Logo'
							/>
						</Link>
					</div>

					<div className='footer__links-partition'>
						<h3 className='heading-fourtiary'>
							Social Media Thingies
						</h3>

						<div className='footer__icons'>
							<button
								className='button button__black button__black--small-circle'
								onClick={() =>
									window.open(
										'https://www.facebook.com/kumonekojp'
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
										'https://twitter.com/kumonekojp'
									)
								}>
								<svg className='button__icon'>
									<use
										xlinkHref={`${sprite}#icon-twitter`}></use>
								</svg>
							</button>
							<button
								className='button button__black button__black--small-circle'
								onClick={() =>
									window.open(
										'https://www.instagram.com/kumonekojp/'
									)
								}>
								<svg className='button__icon'>
									<use
										xlinkHref={`${sprite}#icon-instagram`}></use>
								</svg>
							</button>
						</div>
					</div>

					<div className='footer__links-partition'>
						<h3 className='heading-fourtiary'>Who We Are</h3>

						<div className='footer__links-partition-content footer__links-partition-content--always-column'>
							{clientContext.pages &&
								clientContext.pages
									.filter(
										page => page.title !== 'Call-To-Action'
									)
									.map(page => (
										<Link
											key={page.handle}
											to={`/pages/${page.handle}`}
											className='footer__link'>
											<p className='paragraph'>
												{page.title}
											</p>
										</Link>
									))}
						</div>
					</div>

					<div className='footer__links-partition'>
						<h3 className='heading-fourtiary'>The Details</h3>

						<div className='footer__links-partition-content footer__links-partition-content--always-column'>
							{clientContext.shopPolicies &&
								clientContext.shopPolicies.map(policy => (
									<Link
										key={policy.handle}
										to={`/policy/${policy.handle}`}
										className='footer__link'>
										<p className='paragraph'>
											{policy.title}
										</p>
									</Link>
								))}
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
						href='https://lypzistech.pro/'
						target='_blank'
						rel='noopener noreferrer'>
						Lypzis
					</a>
					.
				</p>
				<p className='paragraph'>
					© Kumoneko - Evoloot Marketplace {new Date().getFullYear()}.
					All rights reserved.
				</p>
			</div>
		</footer>
	);
};

export default memo(Footer);
