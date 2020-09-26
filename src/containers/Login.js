import React, { useContext, useState } from 'react';
//import { useHistory } from 'react-router-dom';

import Layout from '../hoc/Layout';
import { AuthContext } from '../context/authContext';

const Login = props => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const authContext = useContext(AuthContext);
	//const history = useHistory();

	const logUserIn = async event => {
		event.preventDefault();

		try {
			await authContext.login(email, password);
		} catch (err) {
			console.log('Something went terribly wrong! ', err);
		}
	};

	return (
		<Layout>
			<div className='auth-form'>
				<h2 className='heading-secondary heading-secondary--dark auth-form__title'>
					Log In
				</h2>

				<form className='auth-form__form' onSubmit={logUserIn}>
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
							value={email}
							onChange={event => setEmail(event.target.value)}
						/>
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
							onClick={() => console.log('logged in')}>
							<p className='paragraph card__price card__price--big cart__button-text'>
								Log in
							</p>
						</button>
					</div>
				</form>
			</div>
		</Layout>
	);
};

export default Login;
