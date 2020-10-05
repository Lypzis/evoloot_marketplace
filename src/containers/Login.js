import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import Layout from '../hoc/Layout';
import { AuthContext } from '../context/authContext';
import LoadingBar from '../components/LoadingBar';

const Login = props => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const authContext = useContext(AuthContext);
	const [loading, setLoading] = useState(false);

	// login attempts limititation functionality by account 5+3

	const login = async event => {
		event.preventDefault();
		try {
			setLoading(true);
			const emailCopy = email;
			const passCopy = password;

			await authContext.login(emailCopy, passCopy);
		} catch (err) {
			setLoading(false);
			console.log('Fucking error: ', err);
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
						{authContext.loginError && (
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
		</Layout>
	);
};

export default Login;
