import React from 'react';
import { Link } from 'react-router-dom';

import sprite from '../assets/icons/sprite.svg';

const Footer = props => (
	<footer className='footer'>
		<div className='footer__body'>
			<div className='footer__links'>
				<div className='footer__links-partition'>
					<h3 className='heading-fourtiary'>Who We Are</h3>

					<Link to='/' className='footer__link'>
						<p className='paragraph'>About Us</p>
					</Link>

					<Link to='/' className='footer__link'>
						<p className='paragraph'>Our Promise</p>
					</Link>

					<Link to='/' className='footer__link'>
						<p className='paragraph'>Volunteer Application</p>
					</Link>

					<Link to='/' className='footer__link'>
						<p className='paragraph'>Contact Us</p>
					</Link>

					<Link to='/' className='footer__link'>
						<p className='paragraph'>Event Schedule</p>
					</Link>
				</div>
				<div className='footer__links-partition'>
					<h3 className='heading-fourtiary'>My Account</h3>

					<Link to='/' className='footer__link'>
						<p className='paragraph'>My Profile</p>
					</Link>

					<Link to='/' className='footer__link'>
						<p className='paragraph'>My Orders</p>
					</Link>

					<Link to='/' className='footer__link'>
						<p className='paragraph'>My Address</p>
					</Link>

					<Link to='/' className='footer__link'>
						<p className='paragraph'>My Password</p>
					</Link>
				</div>
				<div className='footer__links-partition'>
					<h3 className='heading-fourtiary'>The Details</h3>

					<Link to='/' className='footer__link'>
						<p className='paragraph'>Refunds</p>
					</Link>

					<Link to='/' className='footer__link'>
						<p className='paragraph'>Privacy</p>
					</Link>

					<Link to='/' className='footer__link'>
						<p className='paragraph'>Service</p>
					</Link>
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
					© 2020 Evoloot Marketplace. All Rights Reserved.
				</p>
			</div>
		</div>
	</footer>
);

export default Footer;
