import React, { useState, useEffect, useCallback, useContext } from 'react';
import validate from 'validate.js';

import Layout from '../hoc/Layout';
import NavbarVertical from '../components/NavbarVertical';
import {
	updateCustomer,
	updateCustomerPassword,
	getUserSettings,
} from '../graphql';
import axiosInstace from '../axios';
import { AuthContext } from '../context/authContext';

const Settings = props => {
	const authContext = useContext(AuthContext);

	const [lastName, setLastName] = useState('');
	const [firstName, setFirstName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [passwordNotEqual, setPasswordNotEqual] = useState(false);
	const [emailNotValid, setEmailNotValid] = useState(false);
	const [emailTaken, setEmailTaken] = useState(false);

	const retrieveCustomerData = useCallback(async () => {
		try {
			const customerSettings = await axiosInstace.post(
				'/api/graphql.json',
				getUserSettings(authContext.customerToken)
			);

			const {
				firstName,
				lastName,
				email,
			} = customerSettings.data.data.customer;

			setLastName(lastName);
			setFirstName(firstName);
			setEmail(email);
		} catch (err) {
			console.log(err);
		}
	}, [authContext]);

	useEffect(() => {
		retrieveCustomerData();
	}, [retrieveCustomerData]);

	const validEmail = () => {
		const constraints = {
			from: { email: true },
		};

		const isValid = validate({ from: email }, constraints);

		return isValid === undefined;
	};

	const equalPassword = () => {
		const constraints = {
			confirmPassword: {
				equality: 'password',
			},
		};

		const isValid = validate(
			{
				password: password,
				confirmPassword: passwordConfirm,
			},
			constraints
		);

		return isValid === undefined;
	};

	const updatePassword = async () => {
		try {
			const isPasswordValid = equalPassword();

			if (
				!isPasswordValid ||
				password.trim() === '' ||
				password.length < 5
			) {
				setPasswordNotEqual(true);

				return;
			}

			setPasswordNotEqual(false);

			const res = await axiosInstace.post(
				'/api/graphql.json',
				updateCustomerPassword(authContext.customerToken, password)
			);

			if (res.data.data.customerUpdate.customerUserErrors.length > 0) {
				const errorMessage =
					res.data.data.customerUpdate.customerUserErrors[0].message;

				throw new Error(errorMessage);
			}

			authContext.logout();
		} catch (err) {
			// CONNECTION ERROR
			console.log(err);
		}
	};

	const updateSettings = async () => {
		try {
			const isEmailValid = validEmail();

			if (!isEmailValid) {
				setEmailTaken(false);
				setEmailNotValid(true);

				return;
			}

			setEmailNotValid(false);
			setEmailTaken(false);

			const res = await axiosInstace.post(
				'/api/graphql.json',
				updateCustomer(
					authContext.customerToken,
					firstName.trim(),
					lastName.trim(),
					email
				)
			);

			if (res.data.data.customerUpdate.customerUserErrors.length > 0) {
				const errorMessage =
					res.data.data.customerUpdate.customerUserErrors[0].message;

				throw new Error(errorMessage);
			}
		} catch (err) {
			setEmailTaken(true);
		}
	};

	return (
		<Layout>
			<div className='profile'>
				<NavbarVertical />
				<div className='auth-form'>
					<h2 className='heading-secondary heading-secondary--dark auth-form__title'>
						My Account
					</h2>

					<h3 className='heading-tertiary heading-tertiary--dark'>
						Account Details
					</h3>

					<div className='auth-form__form'>
						<div className='auth-form__field'>
							<label
								htmlFor='email'
								className='paragraph paragraph--black'>
								Email
							</label>
							<input
								type='email'
								id='email'
								className='input'
								maxLength={200}
								value={email}
								onChange={event => setEmail(event.target.value)}
							/>
							{emailNotValid && (
								<p className='paragraph paragraph--error'>
									This Email format is invalid
								</p>
							)}
							{emailTaken && (
								<p className='paragraph paragraph--error'>
									Email has already been taken.
								</p>
							)}
						</div>
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
									value={firstName}
									onChange={event =>
										setFirstName(event.target.value)
									}
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
									value={lastName}
									onChange={event =>
										setLastName(event.target.value)
									}
								/>
							</div>
						</div>

						<div className='auth-form__field-button'>
							<button
								className='button button__white button__white--card-big'
								onClick={updateSettings}>
								<p className='paragraph card__price card__price--big cart__button-text'>
									Update My Settings
								</p>
							</button>
						</div>

						<h3 className='heading-tertiary heading-tertiary--dark big-margin-top'>
							Password Change
						</h3>
						<div className='auth-form__form'>
							<div className='auth-form__field'>
								<label
									htmlFor='new-password'
									className='paragraph paragraph--black'>
									New Password
								</label>
								<input
									type='password'
									id='new-password'
									className='input'
									maxLength={200}
									minLength={5}
									required
									value={password}
									onChange={event =>
										setPassword(event.target.value)
									}
								/>
								{passwordNotEqual && (
									<p className='paragraph paragraph--error'>
										Passwords don't match or are too short
										(min. 5).
									</p>
								)}
							</div>
							<div className='auth-form__field'>
								<label
									htmlFor='retype-password'
									className='paragraph paragraph--black'>
									Retype Your New Password
								</label>
								<input
									type='password'
									id='retype-password'
									className='input'
									maxLength={200}
									minLength={5}
									required
									value={passwordConfirm}
									onChange={event =>
										setPasswordConfirm(event.target.value)
									}
								/>
							</div>

							<div className='auth-form__field-button'>
								<button
									className='button button__white button__white--card-big'
									onClick={updatePassword}>
									<p className='paragraph card__price card__price--big cart__button-text'>
										Update My Password
									</p>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Settings;
