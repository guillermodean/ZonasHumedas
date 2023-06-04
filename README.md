# Humedales Navarra API

This is the backend API for the Humedales Navarra project, which handles user authentication and updating "humedales" items. It is built with TypeScript and integrates with a DynamoDB database. The API utilizes JWT for authentication, Joi for request validation, Express as the web framework, bcrypt for password hashing, dotenv for environment variable management, and Winston for logging.

## Features

- User authentication (login and JWT token generation)
- Update "humedales" items
- Request validation using Joi
- Secure password storage using bcrypt
- Logging of API events using Winston
- Integration with DynamoDB database

## Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v14 or higher)
- NPM (Node Package Manager)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/guillermodean/ZonasHumedas
2. Install the dependencies:

   ```bash
    cd humedales-navarra-api
    npm install	
3. Set up environment variables:

    Create a .env file in the project root directory.

    Add the following environment variables to the .env file:


        # AWS credentials
        AWS_ACCESS_KEY_ID=your-access-key-id
        AWS_SECRET_ACCESS_KEY=your-secret-access-key
        AWS_REGION=eu-west-3

        # Database
        DYNAMODB_TABLE=your-dynamodb-table-name

        # JWT secret key
        JWT_SECRET=your-jwt-secret

        # Logging
        LOG_LEVEL=info
        LOG_DIR=./logs
4. Start the API:

    ```bash
        npm start
The API will be accessible at `http://localhost:3000`.

## API Endpoints

### Authentication

- POST /auth/login: Login with username and password and receive a JWT token.

### Humedales

- PUT /humedales/:id: Update a specific "humedales" item identified by its ID.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please refer to the [Contributing Guidelines](CONTRIBUTING.md) for more details.

## Contact

For any inquiries or feedback, please contact us at [email protected].




Regenerate response