import React, { useReducer, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

// import axiosInstance from '../axios';
// import { createUser, getCustomerToken } from '../graphql';
import Layout from '../hoc/Layout';
import { AuthContext } from '../context/authContext';

const Forget = props => {
	// const authContext = useContext(AuthContext);
	// const history = useHistory();

	// const [email,setEmail] = useState('')

	// const resetPassword = async event => {
	// 	try {
	// 			await axiosInstance.post(
	// 				'/api/graphql.json',
	// 				createUser(
	// 					signupForm.name,
	// 					signupForm.lastName,
	// 					signupForm.email,
	// 					signupForm.password
	// 				)
	// 			);

	// 			history.replace('/');

	// 	} catch (err) {
	// 		console.log('Something went terribly wrong! ', err);
	// 	}
	// };

	return (
		<Layout>
			<div className='auth-form auth-form__box'>
				<h2 className='heading-secondary heading-secondary--dark auth-form__title'>
					Reset My Password
				</h2>

				<form className='auth-form__form' onSubmit={() => {}}>
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
							// value={signupForm.email}
							// onChange={event =>
							// 	dispatchSignupForm({
							// 		type: 'SET_EMAIL',
							// 		email: event.target.value,
							// 	})
							// }
						/>
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
