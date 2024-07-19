import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import validate from 'validate.js';

import axiosInstance from '../axios';
import { recoverCustomerPassword } from '../graphql';
import Layout from '../hoc/Layout';
import LoadingBar from '../components/LoadingBar';

const Forget = props => {
	const history = useHistory();

	const [email, setEmail] = useState('');
	const [invalidEmailMessage, setInvalidEmailMessage] = useState();
	const [loading, setLoading] = useState(false);

	/**
	 * Checks whether the string 'email' is in
	 * a valid email format.
	 * @returns boolean value
	 */
	const validEmail = () => {
		const constraints = {
			from: { email: true },
		};

		const isValid = validate({ from: email }, constraints);

		return isValid === undefined;
	};

	/**
	 * Resets current user password.
	 * - Checks if email input is valid.
	 * - If the email input is valid, proceeds to
	 * requesting a recovery email message, which,
	 * in case there is no one registered with that email,
	 * throws an error.
	 * - If all went correctly, redirects user to home page.
	 * @param {Event} event
	 */
	const resetPassword = async event => {
		event.preventDefault();

		try {
			if (!validEmail()) throw new Error('This email format is invalid.');

			setInvalidEmailMessage(null);

			setLoading(true);

			const user = await axiosInstance.post(
				'/api/graphql.json',
				recoverCustomerPassword(email)
			);

			if (user.data.data.customerRecover.customerUserErrors.length > 0)
				throw new Error(
					'Sorry, there is something wrong with that email.'
				);

			history.replace('/');
		} catch (err) {
			setLoading(false);
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
						{!loading ? (
							<button
								className='button button__black button__black--card-big'
								onClick={() => {}}>
								<p className='paragraph card__price card__price--big cart__button-text'>
									Reset
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

export default Forget;
