import React, { useContext, useReducer, useEffect, useState } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { useSelector, useDispatch } from 'react-redux';

import Layout from '../hoc/Layout';
import NavbarVertical from '../components/NavbarVertical';
import { createCustomerAddress, updateCustomerAddress } from '../graphql';
import axiosInstance from '../axios';
import { AuthContext } from '../context/authContext';
import { updateUserAddress } from '../store/actions/user';
import LoadingBar from '../components/LoadingBar';

const addressFormReducer = (currentFormState, action) => {
	switch (action.type) {
		case 'INITIALIZE':
			return {
				...action.address,
			};
		case 'SET_FIELD':
			return {
				...currentFormState,
				[action.field]: action.value,
			};
		default:
			return currentFormState;
	}
};

const addressFields = {
	firstName: '',
	lastName: '',
	company: '',
	address1: '',
	address2: '',
	city: '',
	country: '',
	province: '',
	zip: '',
};

const Address = props => {
	const authContext = useContext(AuthContext);
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();

	const [addressForm, dispatchAddressForm] = useReducer(addressFormReducer, {
		...addressFields,
	});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (user.mainAddress)
			dispatchAddressForm({
				type: 'INITIALIZE',
				address: user.mainAddress,
			});
	}, [user.mainAddress]);

	const updateAddress = async event => {
		event.preventDefault();

		try {
			setLoading(true);
			if (!user.mainAddress) {
				const customerAddress = await axiosInstance.post(
					'/api/graphql.json',
					createCustomerAddress(
						authContext.customerToken,
						addressForm
					)
				);

				const {
					id,
				} = customerAddress.data.data.customerAddressCreate.customerAddress;

				setLoading(false);
				dispatch(updateUserAddress({ ...addressForm, id }));
				return;
			}

			// ELSE UPDATE
			const addressId = addressForm.id;
			let addressWithoutId = {
				...addressFields,
			};

			for (let key in addressForm)
				if (key !== 'id') addressWithoutId[key] = addressForm[key];

			await axiosInstance.post(
				'/api/graphql.json',
				updateCustomerAddress(
					authContext.customerToken,
					addressId,
					addressWithoutId
				)
			);

			setLoading(false);
			dispatch(updateUserAddress({ ...addressWithoutId, id: addressId }));
		} catch (err) {
			// certainly a connection error
			setLoading(false);
			console.log('Err: ', err);
		}
	};

	const setField = (event, field) => {
		dispatchAddressForm({
			type: 'SET_FIELD',
			field,
			value: event.target.value,
		});
	};

	const setFieldDropdown = (value, field) => {
		dispatchAddressForm({ type: 'SET_FIELD', field, value });
	};

	return (
		<Layout>
			<div className='profile'>
				<NavbarVertical />
				<div className='auth-form'>
					<h2 className='heading-secondary heading-secondary--dark auth-form__title'>
						My Address
					</h2>

					<form className='auth-form__form' onSubmit={updateAddress}>
						<div className='auth-form__field auth-form__field--side-by-side'>
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
									value={addressForm.firstName}
									onChange={event =>
										setField(event, 'firstName')
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
									value={addressForm.lastName}
									onChange={event =>
										setField(event, 'lastName')
									}
								/>
							</div>
						</div>

						<div className='auth-form__field'>
							<label
								htmlFor='company'
								className='paragraph paragraph--black'>
								Company
							</label>
							<input
								type='text'
								id='company'
								className='input'
								maxLength={200}
								value={addressForm.company}
								onChange={event => setField(event, 'company')}
							/>
						</div>
						<div className='auth-form__field'>
							<label
								htmlFor='address'
								className='paragraph paragraph--black'>
								Address
							</label>
							<input
								type='text'
								id='address'
								className='input'
								maxLength={200}
								value={addressForm.address1}
								onChange={event => setField(event, 'address1')}
							/>
						</div>
						<div className='auth-form__field'>
							<label
								htmlFor='additional'
								className='paragraph paragraph--black'>
								Apartment, suite, etc.
							</label>
							<input
								type='text'
								id='additional'
								className='input'
								maxLength={200}
								value={addressForm.address2}
								onChange={event => setField(event, 'address2')}
							/>
						</div>
						<div className='auth-form__field'>
							<label
								htmlFor='city'
								className='paragraph paragraph--black'>
								City
							</label>
							<input
								type='text'
								id='city'
								className='input'
								maxLength={200}
								value={addressForm.city}
								onChange={event => setField(event, 'city')}
							/>
						</div>

						{/* COUNTRY */}
						{/* STATE/PROVINCE */}
						<div className='auth-form__field auth-form__field--side-by-side'>
							<div className='auth-form__field auth-form__field--address'>
								<label
									htmlFor='city'
									className='paragraph paragraph--black'>
									Country
								</label>
								<CountryDropdown
									classes='input input__select input__select--address'
									value={addressForm.country}
									defaultOptionLabel={addressForm.country}
									priorityOptions={['US', 'CA', 'GB', 'AU']}
									onChange={val =>
										setFieldDropdown(val, 'country')
									}
								/>
							</div>
							<div className='auth-form__field auth-form__field--address'>
								<label
									htmlFor='city'
									className='paragraph paragraph--black'>
									Province/State
								</label>
								<RegionDropdown
									classes='input input__select input__select--address'
									country={addressForm.country}
									defaultOptionLabel={addressForm.province}
									value={addressForm.province}
									onChange={val =>
										setFieldDropdown(val, 'province')
									}
								/>
							</div>
						</div>

						<div className='auth-form__field'>
							<label
								htmlFor='zip'
								className='paragraph paragraph--black'>
								Postal/ZIP code
							</label>
							<input
								type='text'
								id='zip'
								className='input'
								maxLength={20}
								value={addressForm.zip}
								onChange={event => setField(event, 'zip')}
							/>
						</div>

						<div className='auth-form__field-button'>
							{!loading ? (
								<button
									className='button button__black button__black--card-big'
									onClick={() => {}}>
									<p className='paragraph card__price card__price--big cart__button-text'>
										Update My Address
									</p>
								</button>
							) : (
								<LoadingBar width={350} loading={loading} />
							)}
						</div>
					</form>
				</div>
			</div>
		</Layout>
	);
};

export default Address;
