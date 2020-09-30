import React, { useState } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

import Layout from '../hoc/Layout';
import NavbarVertical from '../components/NavbarVertical';

const Address = props => {
	const [country, setCountry] = useState('');
	const [region, setRegion] = useState('');

	return (
		<Layout>
			<div className='profile'>
				<NavbarVertical />
				<div className='auth-form'>
					<h2 className='heading-secondary heading-secondary--dark auth-form__title'>
						My Address
					</h2>

					<div className='auth-form__form'>
						<div className='auth-form__field auth-form__field--side-by-side'>
							<div className='auth-form__field'>
								<label
									htmlFor='first-name'
									className='paragraph paragraph--black'>
									First Name
								</label>
								<input
									type='text'
									id='first-name'
									className='input'
									maxLength={100}
									// value={firstName}
									// onChange={event =>
									// 	setFirstName(event.target.value)
									// }
								/>
							</div>
							<div className='auth-form__field'>
								<label
									htmlFor='last-name'
									className='paragraph paragraph--black'>
									Last Name
								</label>
								<input
									type='text'
									id='last-name'
									className='input'
									maxLength={100}
									// value={lastName}
									// onChange={event =>
									// 	setLastName(event.target.value)
									// }
								/>
							</div>
						</div>

						<div className='auth-form__field'>
							<label
								htmlFor='company'
								className='paragraph paragraph--black'>
								Company
							</label>
							<input
								type='text'
								id='company'
								className='input'
								maxLength={200}
								// value={email}
								// onChange={event => setEmail(event.target.value)}
							/>
						</div>
						<div className='auth-form__field'>
							<label
								htmlFor='address'
								className='paragraph paragraph--black'>
								Address
							</label>
							<input
								type='text'
								id='address'
								className='input'
								maxLength={200}
								// value={email}
								// onChange={event => setEmail(event.target.value)}
							/>
						</div>
						<div className='auth-form__field'>
							<label
								htmlFor='additional'
								className='paragraph paragraph--black'>
								Apartment, suite, etc.
							</label>
							<input
								type='text'
								id='additional'
								className='input'
								maxLength={200}
								// value={email}
								// onChange={event => setEmail(event.target.value)}
							/>
						</div>
						<div className='auth-form__field'>
							<label
								htmlFor='city'
								className='paragraph paragraph--black'>
								City
							</label>
							<input
								type='text'
								id='city'
								className='input'
								maxLength={200}
								// value={email}
								// onChange={event => setEmail(event.target.value)}
							/>
						</div>

						{/* COUNTRY */}
						{/* STATE/PROVINCE */}
						<div className='auth-form__field auth-form__field--side-by-side'>
							<div className='auth-form__field auth-form__field--address'>
								<label
									htmlFor='city'
									className='paragraph paragraph--black'>
									Country
								</label>
								<CountryDropdown
									classes='input input__select input__select--address'
									value={country}
									onChange={val => setCountry(val)}
								/>
							</div>
							<div className='auth-form__field auth-form__field--address'>
								<label
									htmlFor='city'
									className='paragraph paragraph--black'>
									Province/State
								</label>
								<RegionDropdown
									classes='input input__select input__select--address'
									country={country}
									value={region}
									onChange={val => setRegion(val)}
								/>
							</div>
						</div>

						<div className='auth-form__field'>
							<label
								htmlFor='zip'
								className='paragraph paragraph--black'>
								Postal/ZIP code
							</label>
							<input
								type='text'
								id='zip'
								className='input'
								maxLength={20}
								// value={email}
								// onChange={event => setEmail(event.target.value)}
							/>
						</div>

						<div className='auth-form__field-button'>
							<button
								className='button button__white button__white--card-big'
								onClick={() => console.log('address updated')}>
								<p className='paragraph card__price card__price--big cart__button-text'>
									Update My Address
								</p>
							</button>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Address;
