import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Layout from '../hoc/Layout';
import { AuthContext } from '../context/authContext';
import LoadingBar from '../components/LoadingBar';
import { getCustomerToken } from '../graphql';
import axiosInstance from '../axios';

const Login = props => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const authContext = useContext(AuthContext);
	const [loading, setLoading] = useState(false);
	const [loginError, setLoginError] = useState(false);
	const history = useHistory();

	// TO-DO: login attempts limititation functionality by account 5+3
	/**
	 * Logs user in and stores his token.
	 * - redirects to home page if successfully loged in.
	 * @param {Event} event
	 */
	const login = async event => {
		event.preventDefault();

		try {
			setLoading(true);
			const customerToken = await axiosInstance.post(
				'/api/graphql.json',
				getCustomerToken(email, password)
			);

			if (
				customerToken.data.data.customerAccessTokenCreate
					.customerUserErrors.length > 0
			)
				throw new Error(
					customerToken.data.data.customerAccessTokenCreate.customerUserErrors.message
				);

			const {
				customerAccessToken,
			} = customerToken.data.data.customerAccessTokenCreate;

			localStorage.setItem(
				'shopifyCustomerToken',
				JSON.stringify(customerAccessToken)
			);

			setLoginError(false);
			setLoading(false);
			await authContext.login(customerAccessToken.accessToken);

			history.replace('/');
		} catch (err) {
			setLoginError(true);
			setLoading(false);
			// else connection error
		}
	};

	return (
		<Layout>
			<div className='auth-form auth-form__box'>
				<h2 className='heading-secondary heading-secondary--dark auth-form__title'>
					Log In
				</h2>

				<form className='auth-form__form' onSubmit={login}>
					<div className='auth-form__field'>
						<label
							htmlFor='email'
							className='paragraph paragraph--black'>
							email
						</label>
						<input
							type='email'
							id='email'
							className='input'
							maxLength={200}
							required
							value={email}
							onChange={event => setEmail(event.target.value)}
						/>
						{loginError && (
							<p className='paragraph paragraph--error'>
								Incorrect email or password.
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
							required
							value={password}
							onChange={event => setPassword(event.target.value)}
						/>
					</div>
					<div className='auth-form__field'>
						<Link to='/forget' className='auth-form__forget-link'>
							<p className='paragraph paragraph--black'>
								Forgot your password?
							</p>
						</Link>
					</div>

					<div className='auth-form__field-button'>
						{!loading ? (
							<button
								className='button button__white button__white--card-big'
								onClick={() => {}}>
								<p className='paragraph card__price card__price--big cart__button-text'>
									Log in
								</p>
							</button>
						) : (
							<LoadingBar loading={loading} width={200} />
						)}
					</div>
				</form>
			</div>
			<div className='login__footer'>
				<h4 className='heading-fourtiary heading-fourtiary--dark'>
					Don't have an account?
				</h4>
				<p className='paragraph paragraph--black'>
					Register with us for a faster checkout, to track the status
					of your order and more.
				</p>
				<button
					className='button button__black button__black--account  button__black--account-big'
					onClick={() => history.push('/signup')}>
					<p className='paragraph card__price card__price--big cart__button-text'>
						create my account
					</p>
				</button>
			</div>
		</Layout>
	);
};

export default Login;
