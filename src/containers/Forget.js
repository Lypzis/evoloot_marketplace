import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import validate from 'validate.js';

import axiosInstance from '../axios';
import { recoverCustomerPassword } from '../graphql';
import Layout from '../hoc/Layout';

const Forget = props => {
	const history = useHistory();

	const [email, setEmail] = useState('');
	const [invalidEmailMessage, setInvalidEmailMessage] = useState();

	const validEmail = () => {
		const constraints = {
			from: { email: true },
		};

		const isValid = validate({ from: email }, constraints);

		return isValid === undefined;
	};

	const resetPassword = async event => {
		event.preventDefault();

		try {
			if (!validEmail()) throw new Error('This email format is invalid.');

			setInvalidEmailMessage(null);

			await axiosInstance.post(
				'/api/graphql.json',
				recoverCustomerPassword(email)
			);

			history.replace('/');
		} catch (err) {
			setInvalidEmailMessage(err.message);
			//console.log('Something went terribly wrong! ', err);
		}
	};

	return (
		<Layout>
			<div className='auth-form auth-form__box'>
				<h2 className='heading-secondary heading-secondary--dark auth-form__title'>
					Reset My Password
				</h2>

				<form className='auth-form__form' onSubmit={resetPassword}>
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
						{invalidEmailMessage && (
							<p className='paragraph paragraph--error'>
								{invalidEmailMessage}
							</p>
						)}
					</div>

					<div className='auth-form__field-button'>
						<button
							className='button button__white button__white--card-big'
							onClick={() => {}}>
							<p className='paragraph card__price card__price--big cart__button-text'>
								Reset
							</p>
						</button>
					</div>
				</form>
			</div>
		</Layout>
	);
};

export default Forget;
