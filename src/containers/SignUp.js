import React, { useReducer, useContext } from 'react';
import validate from 'validate.js';
import { useHistory } from 'react-router-dom';
import Parse from 'parse';

import axiosInstance from '../axios';
import { createUser, getCustomerToken } from '../graphql';
import Layout from '../hoc/Layout';
import { AuthContext } from '../context/authContext';

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
			};
		case 'SET_USER_IS_TAKEN':
			return {
				...currentFormState,
				usernameTaken: true,
				emailIsTaken: false,
			};
		default:
			return currentFormState;
	}
};

const SignUp = props => {
	const authContext = useContext(AuthContext);
	const history = useHistory();

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
			userNameTakenError: 'This username already exists.',
			passwordIsWithError: false,
			emailIsWithError: false,
			emailIsTaken: false,
			usernameTaken: false,
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

	const sigupParse = async () => {
		try {
			const user = new Parse.User();
			user.set('username', signupForm.username);
			user.set('email', signupForm.email);
			user.set('password', signupForm.password);
			await user.signUp();
		} catch (err) {
			if (err.message === 'Account already exists for this username.')
				return dispatchSignupFormError({
					type: 'SET_USER_IS_TAKEN',
				});

			if (
				err.message === 'Account already exists for this email address.'
			)
				return dispatchSignupFormError({
					type: 'SET_EMAIL_IS_TAKEN',
				});

			// connection error
			console.log('Something went terribly wrong! ', err);
		}
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
				//localStorage.clear();

				await sigupParse();

				const customer = await axiosInstance.post(
					'/api/graphql.json',
					createUser(
						signupForm.name,
						signupForm.lastName,
						signupForm.email,
						signupForm.password
					)
				);

				const { id } = customer.data.data.customerCreate.customer;

				const currentUser = Parse.User.current();

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

				currentUser.set('shopifyId', id);
				await currentUser.save();

				authContext.userIsOnline();

				history.replace('/');
			}
		} catch (err) {
			// go to connection error page
			console.log('Something went terribly wrong! ', err);
		}
	};

	return (
		<Layout>
			<div className='auth-form'>
				<h2 className='heading-secondary heading-secondary--dark auth-form__title'>
					Create My Account
				</h2>

				<form className='auth-form__form' onSubmit={validateFields}>
					<div className='auth-form__field'>
						<label
							htmlFor='username'
							className='paragraph paragraph--black'>
							Username
						</label>
						<input
							type='text'
							id='username'
							className='input'
							maxLength={100}
							value={signupForm.username}
							required
							onChange={event =>
								dispatchSignupForm({
									type: 'SET_USERNAME',
									username: event.target.value,
								})
							}
						/>
						{signupFormError.usernameTaken && (
							<p className='paragraph paragraph--error'>
								{signupFormError.userNameTakenError}
							</p>
						)}
					</div>
					{/* <div className='auth-form__field'>
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
							value={signupForm.name}
							onChange={event =>
								dispatchSignupForm({
									type: 'SET_FIRST_NAME',
									name: event.target.value,
								})
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
							value={signupForm.lastName}
							onChange={event =>
								dispatchSignupForm({
									type: 'SET_LAST_NAME',
									lastName: event.target.value,
								})
							}
						/>
					</div> */}
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
						<button
							className='button button__white button__white--card-big'
							onClick={() => {}}>
							<p className='paragraph card__price card__price--big cart__button-text'>
								Sign up
							</p>
						</button>
					</div>
				</form>
			</div>
		</Layout>
	);
};

export default SignUp;
