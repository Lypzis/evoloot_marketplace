# Evoloot Marketplace

A fully functional marketplace application built with React, Shopify API, and GraphQL. This project integrates modern web development technologies to create a seamless e-commerce experience.

## Live Demo

Check out the live demo: [Evoloot Marketplace](https://evoloot-marketplace.netlify.app/)

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Environment](#environment)
- [Node](#node)
- [Known Issues](#known-issues)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- Product browsing
- Cart management
- Secure checkout
- User authentication
- Integration with Shopify API

## Technologies Used

- React
- Shopify API
- GraphQL
- Apollo Client
- Node.js
- Express

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Lypzis/evoloot_marketplace.git
   cd evoloot_marketplace
   ```
2. Install dependencies:

```sh
npm install
```

3. Start the development server:

```sh
 npm start
```

# Usage

Navigate to [http://localhost:3000](http://localhost:3000) to access the application.

Browse products, add items to the cart, and proceed to checkout.

# Environment

To configure environment variables for this project, follow these steps:

1. **Create a `.env` File**

   In the root directory of the project, create a `.env` file. Ensure this file is at the same level as `package.json`.
   Add the required environment variables to the `.env` file. Note that all variable names must start with `REACT_APP_` to be accessible in the React application.

```env
REACT_APP_STORE_URL=YOUR_STORE_URL
REACT_APP_STORE_KEY=YOUR_STORE_KEY
```

# Node

This project requires Node.js version 14. Make sure you have Node.js 14 installed.

You can specify the Node.js version using `nvm`(if installed) by running:

```sh
nvm use 14
```

# Known Issues

Due to the current Shopify API key being read-only, certain features such as product management and checkout may not function fully. The project is designed to be fully functional with appropriate API permissions.

# Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Submit a pull request.

# License

This project is licensed under the MIT License.

# Contact

For any questions or inquiries, please contact me at [victor.piccoli@lypzistech.pro].
