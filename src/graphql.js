export const createUser = (firstName, lastName, email, password) => {
	return {
		query: `
					mutation customerCreate($input: CustomerCreateInput!) {
						customerCreate(input: $input) {
							customer {
								id
							}
							customerUserErrors {
								code
								field
								message
							}
						}
					}
                `,
		variables: {
			input: {
				firstName,
				lastName,
				email,
				password,
			},
		},
	};
};

export const getCustomerToken = (email, password) => {
	return {
		query: `
					mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
						customerAccessTokenCreate(input: $input) {
							customerAccessToken {
								accessToken
								expiresAt
							}
							customerUserErrors {
								code
								field
								message
							}
						}
					}
                `,
		variables: {
			input: {
				email,
				password,
			},
		},
	};
};

export const updateCustomer = (
	customerAccessToken,
	firstName,
	lastName,
	email
) => {
	return {
		query: `
					mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
						customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
							customer {
								id
							}
							customerAccessToken {
								accessToken
								expiresAt
							}
							customerUserErrors {
								code
								field
								message
							}
						}
					}
                `,
		variables: {
			customerAccessToken,
			customer: {
				firstName,
				lastName,
				email,
			},
		},
	};
};

export const updateCustomerPassword = (customerAccessToken, password) => {
	return {
		query: `
					mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
						customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
							customer {
								id
							}
							customerAccessToken {
								accessToken
								expiresAt
							}
							customerUserErrors {
								code
								field
								message
							}
						}
					}
                `,
		variables: {
			customerAccessToken,
			customer: {
				password,
			},
		},
	};
};

export const recoverCustomerPassword = email => {
	return {
		query: `
					mutation customerRecover($email: String!) {
						customerRecover(email: $email) {
						customerUserErrors {
							code
							field
							message
						}
						}
					}
                `,
		variables: {
			email,
		},
	};
};

export const getUserSettings = customerAccessToken => {
	return {
		query: `
					{
						customer (customerAccessToken: "${customerAccessToken}"){
							firstName
							lastName
							email
						}
					}
				`,
	};
};

export const getUserSettingsAndAddress = customerAccessToken => {
	return {
		query: `
					{
						customer (customerAccessToken: "${customerAccessToken}"){
							firstName
							lastName
							email
							defaultAddress{
								id
								firstName
								lastName
								company
								address1
								address2
								city
								country
								province
								zip
							}
						}
					}
				`,
	};
};

export const createCustomerAddress = (customerAccessToken, address) => {
	return {
		query: `
					mutation customerAddressCreate($customerAccessToken: String!, $address: MailingAddressInput!) {
						customerAddressCreate(customerAccessToken: $customerAccessToken, address: $address) {
							customerAddress {
								id
							}
							customerUserErrors {
								code
								field
								message
							}
						}
					}
                `,
		variables: {
			customerAccessToken,
			address,
		},
	};
};

export const updateCustomerAddress = (
	customerAccessToken,
	addressId,
	address
) => {
	return {
		query: `
					mutation customerAddressUpdate($customerAccessToken: String!, $id: ID!, $address: MailingAddressInput!) {
						customerAddressUpdate(customerAccessToken: $customerAccessToken, id: $id, address: $address) {
							customerAddress {
								id
							}
							customerUserErrors {
								code
								field
								message
							}
						}
					}
                `,
		variables: {
			customerAccessToken,
			id: addressId,
			address,
		},
	};
};

export const createCustomerCheckout = (lineItems, shippingAddress, email) => {
	return {
		query: `	 
				mutation checkoutCreate($input: CheckoutCreateInput!) {
					checkoutCreate(input: $input) {
					checkout {
						id
					}
					checkoutUserErrors {
						code
						field
						message
					}
					}
				}
			`,
		variables: {
			input: {
				allowPartialAddresses: true,
				email,
				lineItems,
				shippingAddress,
			},
		},
	};
};

export const getAvailableShippingRates = customerAccessToken => {
	return {
		query: `	 
				{
					customer (customerAccessToken: "${customerAccessToken}"){
						lastIncompleteCheckout {
							availableShippingRates {
								ready
								shippingRates {
									title
									priceV2 {
										amount
										currencyCode
									}
								}
							}
						}
					}
				}
			`,
	};
};

export const updateCheckoutShippingAddress = (shippingAddress, checkoutId) => {
	return {
		query: `
					mutation checkoutShippingAddressUpdateV2($shippingAddress: MailingAddressInput!, $checkoutId: ID!) {
						checkoutShippingAddressUpdateV2(shippingAddress: $shippingAddress, checkoutId: $checkoutId) {
							checkout {
								id
							}
							checkoutUserErrors {
								code
								field
								message
							}
						}
					}
                `,
		variables: {
			shippingAddress,
			checkoutId,
		},
	};
};

export const updateCheckoutEmail = (email, checkoutId) => {
	return {
		query: `
					mutation checkoutEmailUpdateV2($checkoutId: ID!, $email: String!) {
						checkoutEmailUpdateV2(checkoutId: $checkoutId, email: $email) {
							checkout {
								id
							}
							checkoutUserErrors {
								code
								field
								message
							}
						}
					}
                `,
		variables: {
			email,
			checkoutId,
		},
	};
};

export const getCustomerOrders = (
	customerAccessToken,
	groupBy = 'first: 5'
) => {
	// PART OF ORDERS
	// customerUrl
	// statusUrl
	return {
		query: `
					{
						customer (customerAccessToken: "${customerAccessToken}"){
							orders(${groupBy}) {
								pageInfo { 
									hasNextPage 
									hasPreviousPage
								}
								edges {
									cursor
									node {
										name
										processedAt
										successfulFulfillments{
											fulfillmentLineItems(first:100){
										        edges {
										            node {
										                quantity
										            }
										        }
										    }
											trackingInfo{
												number
												url
											}
										}
										lineItems(first: 100) {
											edges {
												node {
													variant{
														sku	
														product{
															handle
														}
														image {
															originalSrc
															altText
														}
														priceV2{
															amount
															currencyCode
														}
													}
													quantity
													title
												}
											}
										}
										subtotalPriceV2{
											amount
											currencyCode
										}
										totalShippingPriceV2 {
											amount
											currencyCode
										}
										totalPriceV2{
											amount
											currencyCode
										}
										totalRefundedV2 {
											amount
											currencyCode
										}
										totalTaxV2 {
											amount
											currencyCode
										}
									}
								}
							}
						}
					}
			`,
	};
};

export const getShopPolicies = () => {
	return {
		query: `
					{
						shop {
							privacyPolicy {
								title
								body
								handle
							}
							refundPolicy {
								title
								body
								handle
							}
							termsOfService{
								title
								body
								handle
							}
						}
					}
			`,
	};
};

export const getShopPages = () => {
	return {
		query: `	 
					{
						pages(first:100) {
							edges {
								node {
									title
									handle
									body
								}
							}
						}
					}
			`,
	};
};
