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
