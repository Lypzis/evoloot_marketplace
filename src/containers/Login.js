import React, { useContext, useState } from 'react';

import Layout from '../hoc/Layout';
import { AuthContext } from '../context/authContext';

const Login = props => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const authContext = useContext(AuthContext);

	// login attempts limititation functionality by account 5+3

	const login = async () => {
		const emailCopy = email;
		const passCopy = password;

		await authContext.login(emailCopy, passCopy);
	};

	return (
		<Layout>
			<div className='auth-form'>
				<h2 className='heading-secondary heading-secondary--dark auth-form__title'>
					Log In
				</h2>

				<div className='auth-form__form'>
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

					<div className='auth-form__field-button'>
						<button
							className='button button__white button__white--card-big'
							onClick={login}>
							<p className='paragraph card__price card__price--big cart__button-text'>
								Log in
							</p>
						</button>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Login;
