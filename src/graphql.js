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
