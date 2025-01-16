# Natours

Natours is a tour booking platform that allows users to explore and book various tours. The application is built with a RESTful API architecture and features robust authentication and authorization mechanisms using JWT tokens. Below are the key functionalities and structure of the application.

---

## Features

### Tours Management
- **Get All Tours**: Retrieve a list of all available tours.
- **Get One Tour**: View detailed information about a specific tour.
- **Create New Tour**: Add a new tour to the platform (restricted to `admin` and `lead-guide` roles).
- **Update Tour**: Modify existing tour details (restricted to `admin` and `lead-guide` roles).
- **Delete Tour**: Remove a tour from the platform (restricted to `admin` and `lead-guide` roles).

### Users Management
- **Get All Users**: Retrieve a list of all registered users (restricted access).
- **Authentication**: Users are authenticated via JSON Web Tokens (JWT) for secure access.

### Reviews Management
- **Write Reviews**: Users can submit reviews for tours they have experienced.

---

## Authentication and Authorization

- **JWT Authentication**: Each request is authenticated using a JWT token to ensure secure access to API endpoints.
- **Role-based Access Control (RBAC)**:
  - Only users with `admin` or `lead-guide` roles can manage tours (create, update, delete).
  - Access to certain user-related endpoints is restricted based on roles.

---

## API Endpoints

### Tours Controller
1. **GET /tours**: Fetch all tours.
2. **GET /tours/:id**: Fetch details of a specific tour by its ID.
3. **POST /tours**: Create a new tour (restricted to `admin` and `lead-guide`).
4. **PATCH /tours/:id**: Update an existing tour (restricted to `admin` and `lead-guide`).
5. **DELETE /tours/:id**: Delete a tour (restricted to `admin` and `lead-guide`).

### Users Controller
1. **GET /users**: Fetch all users (restricted to authorized roles).

### Reviews Controller
1. **POST /reviews**: Allow users to write reviews for tours.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/natours.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the root directory and configure the following:
   ```env
   DATABASE=<your_database_url>
   JWT_SECRET=<your_jwt_secret>
   JWT_EXPIRES_IN=<token_expiration_time>
   JWT_COOKIE_EXPIRES_IN=<cookie_expiration_time>
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

---

## Contributing

If you'd like to contribute to Natours, please fork the repository and submit a pull request. For major changes, please open an issue to discuss your ideas first.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- Special thanks to the contributors and the open-source community for their support.
