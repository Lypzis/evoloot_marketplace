/**
 * Creates a graphql query for Creating a new user.
 * @param {String} firstName
 * @param {String} lastName
 * @param {String} email
 * @param {String} password
 * @returns graphql query body
 */
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

/**
 * Creates a graphql query to get the current user token.
 * @param {String} email
 * @param {String} password
 * @returns graphql query body
 */
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

/**
 * Creates a graphql query to update the current user data.
 * - It does not update password.
 * @param {String} customerAccessToken
 * @param {String} firstName
 * @param {String} lastName
 * @param {String} email
 * @returns graphql query body
 */
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

/**
 * Creates a graphql query to update current user password.
 * @param {String} customerAccessToken
 * @param {String} password
 * @returns graphql query body
 */
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

/**
 * Creates a graphql query for recovering user password.
 * @param {String} email
 * @returns graphql query body
 */
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

/**
 * Creates a graphql query for retrieving user information.
 * @param {String} customerAccessToken
 * @returns graphql query body
 */
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

/**
 * Creates a graphql query for retrieving user information
 * along with his default address.
 * @param {String} customerAccessToken
 * @returns graphql query body
 */
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

/**
 * Creates a graphql query to create user address.
 * @param {String} customerAccessToken
 * @param {Object} address
 * @returns graphql query body
 */
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

/**
 * Creates a graphql query for updating the user default address.
 * @param {String} customerAccessToken
 * @param {String} addressId
 * @param {Object} address
 * @returns graphql query body
 */
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

/**
 * Creates a graphql query for the checkout.
 * @param {Array} lineItems
 * @param {Object} shippingAddress
 * @param {String} email
 * @returns graphql query body
 */
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

/**
 * Creates a graphql query to retrieve available shipping rates
 * for the last created checkout.
 * @param {String} customerAccessToken
 * @returns graphql query body
 */
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

/**
 * Creates a graphql query for updating a checkout shipping address.
 * @param {Object} shippingAddress
 * @param {String} checkoutId
 * @returns graphql query body
 */
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

/**
 * Creates a graphql query for updating a checkout email.
 * @param {String} email
 * @param {String} checkoutId
 * @returns graphql query body
 */
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

/**
 * Creates a graphql query to get the user orders.
 * @param {String} customerAccessToken
 * @param {String} groupBy graphql connections
 * @returns graphql query body
 */
export const getCustomerOrders = (
  customerAccessToken,
  groupBy = 'first: 5'
) => {
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

/**
 * Creates a graphql query to get the shop policies.
 * @returns graphql query body
 */
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

/**
 * Creates a graphql query to get the shop currency.
 * @returns graphql query body
 */
export const getShopCurrency = () => {
  return {
    query: `
					{
						shop {
							paymentSettings {
								currencyCode
							}
						}
					}
			`,
  };
};

/**
 * Creates a graphql query to get the shop pages.
 * @returns graphql query body
 */
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

/**
 * Creates a graphql query to get products from a collection.
 * @param {String} handle
 * @param {String} queryParam e.g first:20, after: "eyJsYXN0X2lkIjo1ODUxODk5NDYxNzk0LCJsYXN0X3ZhbHVlIjoiMCJ9"
 * default is 'first: 20'
 * @returns graphql query body
 */
export const getCollectionProducts = (handle, queryParam) => {
  return {
    query: `
				{ 
					collectionByHandle (handle: "${handle}") {
						title
						products(${queryParam ? queryParam : 'first: 20'}) {
							edges {
								cursor
								node {
									id
									title
									availableForSale
									createdAt
									publishedAt
									description
									descriptionHtml
									handle
									onlineStoreUrl
									productType
									tags
									images(first: 100) {
										edges {
											node {
												id
												altText
												originalSrc
											}
										}
									}
									options {
										id
										name
										values
										
									}
									variants(first: 100) {
										edges {
											node {
												id
												availableForSale
												requiresShipping
												sku
												title
												image {
													id
													altText
													originalSrc
												}
												priceV2 {
													amount
													currencyCode
												}
											}
										}
									}
								}
							}
						}
					}
				}
			`,
  };
};

/**
 * Creates a graphql query to get all collection along with some of their products.
 * @returns graphql query body
 */
export const getAllCollectionsAndProducts = () => {
  return {
    query: `
				{ 
					collections(first:100)  {
						edges {
							cursor
							node {
								id
								description
								descriptionHtml
								handle
								title
								updatedAt
								image{
									id
									altText
									originalSrc
								}
								products(first: 20) {
									edges {
										cursor
										node {
											id
											title
											availableForSale
											createdAt
											publishedAt
											description
											descriptionHtml
											handle
											onlineStoreUrl
											productType
											tags
											images(first: 100) {
												edges {
													node {
														id
														altText
														originalSrc
													}
												}
											}
											options {
												id
												name
												values
												
											}
											variants(first: 100) {
												edges {
													node {
														id
														availableForSale
														requiresShipping
														sku
														title
														image {
															id
															altText
															originalSrc
														}
														priceV2 {
															amount
															currencyCode
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			`,
  };
};
