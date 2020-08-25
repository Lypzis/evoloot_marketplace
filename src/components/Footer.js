import React from 'react';

import sprite from '../assets/icons/sprite.svg';

const Footer = props => (
	<footer className='footer'>
		<div className='footer__body'>
			<div className='footer__links'>
				<div className='footer__links-partition'>
					<h3 className='heading-fourtiary'>Who We Are</h3>

					<a href='/' className='footer__link'>
						<p className='paragraph'>About Us</p>
					</a>

					<a href='/' className='footer__link'>
						<p className='paragraph'>Our Promise</p>
					</a>

					<a href='/' className='footer__link'>
						<p className='paragraph'>Volunteer Application</p>
					</a>

					<a href='/' className='footer__link'>
						<p className='paragraph'>Contact Us</p>
					</a>

					<a href='/' className='footer__link'>
						<p className='paragraph'>Event Schedule</p>
					</a>
				</div>
				<div className='footer__links-partition'>
					<h3 className='heading-fourtiary'>My Account</h3>

					<a href='/' className='footer__link'>
						<p className='paragraph'>My Profile</p>
					</a>

					<a href='/' className='footer__link'>
						<p className='paragraph'>My Orders</p>
					</a>

					<a href='/' className='footer__link'>
						<p className='paragraph'>My Address</p>
					</a>

					<a href='/' className='footer__link'>
						<p className='paragraph'>My Password</p>
					</a>
				</div>
				<div className='footer__links-partition'>
					<h3 className='heading-fourtiary'>The Details</h3>

					<a href='/' className='footer__link'>
						<p className='paragraph'>Refunds</p>
					</a>

					<a href='/' className='footer__link'>
						<p className='paragraph'>Privacy</p>
					</a>

					<a href='/' className='footer__link'>
						<p className='paragraph'>Service</p>
					</a>
				</div>
				<div className='footer__links-partition'>
					<h3 className='heading-fourtiary'>Social Media Thingies</h3>

					<div className='footer__icons'>
						<button className='button button__white button__white--small-circle'>
							<svg className='button__icon'>
								<use
									xlinkHref={`${sprite}#icon-facebook`}></use>
							</svg>
						</button>
						<button className='button button__white button__white--small-circle'>
							<svg className='button__icon'>
								<use xlinkHref={`${sprite}#icon-twitter`}></use>
							</svg>
						</button>
						<button className='button button__white button__white--small-circle'>
							<svg className='button__icon'>
								<use
									xlinkHref={`${sprite}#icon-instagram`}></use>
							</svg>
						</button>
					</div>
				</div>
			</div>
			<div className='footer__copyright'>
				<p className='paragraph'>
					© 2019 Evoloot Marketplace. All Rights Reserved.
				</p>
			</div>
		</div>
	</footer>
);

export default Footer;
