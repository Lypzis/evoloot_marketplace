import React, { useReducer, useContext, useState } from 'react';
import validate from 'validate.js';
import { useHistory } from 'react-router-dom';

import axiosInstance from '../axios';
import { createUser, getCustomerToken } from '../graphql';
import Layout from '../hoc/Layout';
import { AuthContext } from '../context/authContext';
import LoadingBar from '../components/LoadingBar';

const signupFormReducer = (currentFormState, action) => {
	switch (action.type) {
		case 'SET_USERNAME':
			return {
				...currentFormState,
				username: action.username,
			};
		case 'SET_FIRST_NAME':
			return {
				...currentFormState,
				name: action.name,
			};
		case 'SET_LAST_NAME':
			return { ...currentFormState, lastName: action.lastName };
		case 'SET_EMAIL':
			return { ...currentFormState, email: action.email };
		case 'SET_PASSWORD':
			return {
				...currentFormState,
				password: action.password,
			};
		case 'SET_CONFIRM_PASSWORD':
			return {
				...currentFormState,
				passwordConfirm: action.passwordConfirm,
			};
		default:
			return currentFormState;
	}
};

const signupFormErrorReducer = (currentFormState, action) => {
	switch (action.type) {
		case 'SET_PASSWORD_IS_WITH_ERROR':
			return {
				...currentFormState,
				passwordIsWithError: action.passwordIsWithError,
			};
		case 'SET_EMAIL_IS_WITH_ERROR':
			return {
				...currentFormState,
				emailIsWithError: action.emailIsWithError,
			};
		case 'SET_EMAIL_IS_TAKEN':
			return {
				...currentFormState,
				usernameTaken: false,
				emailIsTaken: true,
				emailPending: false,
			};
		case 'SET_USER_IS_TAKEN':
			return {
				...currentFormState,
				usernameTaken: true,
				emailIsTaken: false,
				emailPending: false,
			};
		case 'SET_EMAIL_IS_PENDING':
			return {
				...currentFormState,
				usernameTaken: false,
				emailIsTaken: false,
				emailPending: true,
			};
		default:
			return currentFormState;
	}
};

const SignUp = props => {
	const authContext = useContext(AuthContext);
	const history = useHistory();
	const [loading, setLoading] = useState(false);

	const [signupForm, dispatchSignupForm] = useReducer(signupFormReducer, {
		username: '',
		name: '',
		lastName: '',
		email: '',
		password: '',
		passwordConfirm: '',
	});

	const [signupFormError, dispatchSignupFormError] = useReducer(
		signupFormErrorReducer,
		{
			passwordError: "Passwords don't match.",
			emailError: 'This email format is invalid.',
			emailTakenError: 'This email is already in use.',
			emailPendingError:
				'A verification link was already sent to your email.',
			userNameTakenError: 'This username already exists.',
			passwordIsWithError: false,
			emailIsWithError: false,
			emailIsTaken: false,
			usernameTaken: false,
			emailPending: false,
		}
	);

	const validEmail = () => {
		const constraints = {
			from: { email: true },
		};

		const isValid = validate({ from: signupForm.email }, constraints);

		if (isValid !== undefined)
			dispatchSignupFormError({
				type: 'SET_EMAIL_IS_WITH_ERROR',
				emailIsWithError: true,
			});

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
				password: signupForm.password,
				confirmPassword: signupForm.passwordConfirm,
			},
			constraints
		);

		if (isValid !== undefined)
			dispatchSignupFormError({
				type: 'SET_PASSWORD_IS_WITH_ERROR',
				passwordIsWithError: true,
			});

		return isValid === undefined;
	};

	const validateFields = async event => {
		event.preventDefault();

		const isEmailValid = validEmail();
		const isPasswordValid = equalPassword();

		if (isEmailValid)
			dispatchSignupFormError({
				type: 'SET_EMAIL_IS_WITH_ERROR',
				emailIsWithError: false,
			});
		if (isPasswordValid)
			dispatchSignupFormError({
				type: 'SET_PASSWORD_IS_WITH_ERROR',
				passwordIsWithError: false,
			});

		try {
			if (isEmailValid && isPasswordValid) {
				setLoading(true);
				const createdUser = await axiosInstance.post(
					'/api/graphql.json',
					createUser(
						signupForm.name,
						signupForm.lastName,
						signupForm.email,
						signupForm.password
					)
				);

				if (
					createdUser.data.data.customerCreate.customerUserErrors
						.length > 0
				) {
					const errorMessage =
						createdUser.data.data.customerCreate
							.customerUserErrors[0].message;

					throw new Error(errorMessage);
				}

				const customerToken = await axiosInstance.post(
					'/api/graphql.json',
					getCustomerToken(signupForm.email, signupForm.password)
				);

				localStorage.setItem(
					'shopifyCustomerToken',
					JSON.stringify(
						customerToken.data.data.customerAccessTokenCreate
							.customerAccessToken
					)
				);

				setLoading(false);
				authContext.userIsOnline();

				history.replace('/');
			}
		} catch (err) {
			setLoading(false);
			if (err.message === 'Email has already been taken')
				dispatchSignupFormError({ type: 'SET_EMAIL_IS_TAKEN' });

			let error = err.message;
			error = error.split(',');

			if (
				error.length > 1 &&
				error[1] ===
					' please click the link included to verify your email address.'
			) {
				dispatchSignupFormError({ type: 'SET_EMAIL_IS_PENDING' });
			}

			// TO-DO
			// If user order something and then try to create account with the same email
			//	We have sent an email to test07@test.com, please click the link included to verify your email address.

			// go to connection error page
			console.log('Something went terribly wrong! ', err);
		}
	};

	return (
		<Layout>
			<div className='auth-form auth-form__box'>
				<h2 className='heading-secondary heading-secondary--dark auth-form__title'>
					Create My Account
				</h2>

				<form className='auth-form__form' onSubmit={validateFields}>
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
							required
							value={signupForm.email}
							onChange={event =>
								dispatchSignupForm({
									type: 'SET_EMAIL',
									email: event.target.value,
								})
							}
						/>
						{signupFormError.emailIsWithError && (
							<p className='paragraph paragraph--error'>
								{signupFormError.emailError}
							</p>
						)}
						{signupFormError.emailIsTaken && (
							<p className='paragraph paragraph--error'>
								{signupFormError.emailTakenError}
							</p>
						)}
						{signupFormError.emailPending && (
							<p className='paragraph paragraph--validation'>
								{signupFormError.emailPendingError}
							</p>
						)}
					</div>
					<div className='auth-form__field'>
						<label
							htmlFor='password'
							className='paragraph paragraph--black'>
							Password
						</label>
						<input
							type='password'
							id='password'
							className='input'
							maxLength={100}
							minLength={5}
							required
							value={signupForm.password}
							onChange={event =>
								dispatchSignupForm({
									type: 'SET_PASSWORD',
									password: event.target.value,
								})
							}
						/>
					</div>
					<div className='auth-form__field'>
						<label
							htmlFor='password-retype'
							className='paragraph paragraph--black'>
							Retype The Password
						</label>
						<input
							type='password'
							id='password-retype'
							className='input'
							maxLength={100}
							minLength={5}
							required
							value={signupForm.passwordConfirm}
							onChange={event =>
								dispatchSignupForm({
									type: 'SET_CONFIRM_PASSWORD',
									passwordConfirm: event.target.value,
								})
							}
						/>
						{signupFormError.passwordIsWithError && (
							<p className='paragraph paragraph--error'>
								{signupFormError.passwordError}
							</p>
						)}
					</div>

					<div className='auth-form__field-button'>
						{!loading ? (
							<button
								className='button button__white button__white--card-big'
								onClick={() => {}}>
								<p className='paragraph card__price card__price--big cart__button-text'>
									Sign up
								</p>
							</button>
						) : (
							<LoadingBar loading={loading} />
						)}
					</div>
				</form>
			</div>
		</Layout>
	);
};

export default SignUp;
