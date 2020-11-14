import React, { useContext, useReducer } from 'react';
import { useSelector } from 'react-redux';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

import { AuthContext } from '../context/authContext';
import { createCustomerCheckout, getAvailableShippingRates } from '../graphql';
import axiosInstace from '../axios';
import LoadingBar from '../components/LoadingBar';
import { ClientContext } from '../context/clientContext';

const shippingFormReducer = (currentFormState, action) => {
	switch (action.type) {
		case 'SET_LOADING':
			return {
				...currentFormState,
				calcLoading: action.calcLoading,
				calculateError: false,
			};
		case 'SET_ERROR':
			return {
				...currentFormState,
				calculateError: true,
			};
		case 'INCREASE_TRIAL_COUNT':
			return {
				...currentFormState,
				trialsCount: ++currentFormState.trialsCount,
			};
		case 'SET_AVAILABLE_SHIPPING_RATES':
			return {
				...currentFormState,
				availableShippingRates: action.availableShippingRates,
				shippingWasCalculated: true,
				trialsCount: 0,
				calcLoading: false,
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

const ShippingCalculator = props => {
	const checkout = useSelector(state => state.checkout);
	const user = useSelector(state => state.user);
	const authContext = useContext(AuthContext);
	const clientContext = useContext(ClientContext);

	const [shippingForm, dispatchShippingForm] = useReducer(
		shippingFormReducer,
		{
			country: user.mainAddress ? user.mainAddress.country : '',
			province: user.mainAddress ? user.mainAddress.province : '',
			zip: user.mainAddress ? user.mainAddress.zip : '',
			availableShippingRates: [],
			trialsCount: 0,
			shippingWasCalculated: false,
			calcLoading: false,
			calculateError: false,
		}
	);

	const calculateShipping = async (wasItLoaded = null) => {
		const { country, province, zip } = shippingForm;

		if (country && province && zip)
			try {
				dispatchShippingForm({
					type: 'SET_LOADING',
					calcLoading: true,
				});
				const lineItems = checkout.lineItems.map(product => {
					return {
						variantId: product.id,
						quantity: product.quantity,
					};
				});

				const shippingAddress = {
					country,
					province,
					zip,
					city: 'any',
				};

				await axiosInstace.post(
					'/api/graphql.json',
					createCustomerCheckout(
						lineItems,
						shippingAddress,
						user.email
					)
				);

				const shippingRates = await axiosInstace.post(
					'/api/graphql.json',
					getAvailableShippingRates(authContext.customerToken)
				);

				dispatchShippingForm({ type: 'INCREASE_TRIAL_COUNT' });

				wasItLoaded =
					shippingRates.data.data.customer.lastIncompleteCheckout
						.availableShippingRates.shippingRates;

				if (!wasItLoaded && shippingForm.trialsCount < 10)
					return calculateShipping(wasItLoaded);

				dispatchShippingForm({
					type: 'SET_AVAILABLE_SHIPPING_RATES',
					availableShippingRates:
						shippingRates.data.data.customer.lastIncompleteCheckout
							.availableShippingRates.shippingRates,
				});
			} catch (err) {
				dispatchShippingForm({
					type: 'SET_LOADING',
					calcLoading: false,
				});
			}
		else {
			dispatchShippingForm({ type: 'SET_ERROR' });
		}
	};

	const setField = (event, field) => {
		dispatchShippingForm({
			type: 'SET_FIELD',
			field,
			value: event.target.value,
		});
	};

	const setFieldDropdown = (value, field) => {
		dispatchShippingForm({ type: 'SET_FIELD', field, value });
	};

	return (
		<div>
			{authContext.customerToken && checkout.lineItems.length > 0 && (
				<div className='shipping'>
					<p className='paragraph paragraph--black'>
						Shipping Estimate:
					</p>
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
								value={shippingForm.country}
								priorityOptions={['US', 'CA', 'GB', 'AU']}
								defaultOptionLabel={shippingForm.country}
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
								country={shippingForm.country}
								defaultOptionLabel={shippingForm.province}
								value={shippingForm.province}
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
							value={shippingForm.zip}
							onChange={event => setField(event, 'zip')}
						/>
					</div>
					<div className='auth-form__field-button'>
						{!shippingForm.calcLoading ? (
							<button
								className='button button__white button__white--card-big'
								onClick={calculateShipping}>
								<p className='paragraph card__price card__price--big cart__button-text'>
									calculate shipping
								</p>
							</button>
						) : (
							<LoadingBar marginTop='3rem' width={400} />
						)}
					</div>
					{shippingForm.calculateError && (
						<div className='auth-form__field'>
							<p className='paragraph paragraph--black'>
								You have to fill correctly all the fields!
							</p>
						</div>
					)}

					{shippingForm.availableShippingRates &&
					shippingForm.availableShippingRates.length > 0 ? (
						<div className='auth-form__field'>
							<p className='paragraph paragraph--black'>
								Here are the available shipping rates to that
								location:
							</p>
							<ul className='shipping__rate-list'>
								{shippingForm.availableShippingRates.map(
									rate => {
										const {
											amount,
											//currencyCode,
										} = rate.priceV2;

										return (
											<li key={rate.title}>
												<p className='paragraph paragraph--black'>
													{rate.title} at{' '}
													{
														clientContext
															.currencyRate.code
													}
													$
													{parseFloat(
														amount *
															clientContext
																.currencyRate
																.value
													).toFixed(2)}
												</p>
											</li>
										);
									}
								)}
							</ul>
						</div>
					) : (
						<div className='auth-form__field'>
							{shippingForm.shippingWasCalculated && (
								<p className='paragraph paragraph--black'>
									Sorry, shipping is not available to that
									location.
								</p>
							)}
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default ShippingCalculator;
