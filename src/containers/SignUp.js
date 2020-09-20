import React from 'react';

import Layout from '../hoc/Layout';

const SignUp = props => {
	return (
		<Layout>
			<div className='auth-form'>
				<h2 className='heading-secondary heading-secondary--dark auth-form__title'>
					Create My Account
				</h2>

				<form className='auth-form__form'>
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
						/>
					</div>
					<div className='auth-form__field'>
						<label
							htmlFor='email'
							className='paragraph paragraph--black'>
							Email *
						</label>
						<input
							type='email'
							id='email'
							className='input'
							maxLength={200}
							required
						/>
					</div>
					<div className='auth-form__field'>
						<label
							htmlFor='password'
							className='paragraph paragraph--black'>
							Password *
						</label>
						<input
							type='password'
							id='password'
							className='input'
							maxLength={100}
							required
						/>
					</div>
					<div className='auth-form__field'>
						<label
							htmlFor='password-retype'
							className='paragraph paragraph--black'>
							Retype Password *
						</label>
						<input
							type='password'
							id='password-retype'
							className='input'
							maxLength={100}
							required
						/>
					</div>

					<div className='auth-form__field-button'>
						<button
							className='button button__white button__white--card-big'
							onClick={() => console.log('signed up')}>
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
