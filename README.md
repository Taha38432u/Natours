# Natours

Natours is a tour booking platform that allows users to explore and book various tours. The application is built with a RESTful API architecture and features robust authentication and authorization mechanisms using JWT tokens. Below are the key functionalities and structure of the application.

---

## Features

### Tours Management
- Retrieve a list of all available tours.
- View detailed information about a specific tour.
- Add a new tour to the platform (restricted to `admin` and `lead-guide` roles).
- Modify existing tour details (restricted to `admin` and `lead-guide` roles).
- Remove a tour from the platform (restricted to `admin` and `lead-guide` roles).

### Users Management
- Retrieve a list of all registered users (restricted access).
- Users are authenticated via JSON Web Tokens (JWT) for secure access.
- Users can reset their passwords.
- Users can update their personal details.

### Reviews Management
- Users can submit reviews for tours they have experienced.

---

## Authentication and Authorization

- **JWT Authentication**: Each request is authenticated using a JWT token to ensure secure access to API endpoints.
- **Role-based Access Control (RBAC)**:
  - Only users with `admin` or `lead-guide` roles can manage tours (create, update, delete).
  - Access to certain user-related features is restricted based on roles.

---

## Technology Stack

- **Node.js**: Backend JavaScript runtime environment.
- **Express.js**: Web application framework for building RESTful APIs.
- **MongoDB**: NoSQL database for efficient data storage and retrieval.

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

## Presentation Notes

Natours is designed to be:

1. **User-Friendly**:
   - Intuitive interface for users to browse and book tours.
   - Seamless user experience for password resets and profile updates.

2. **Secure**:
   - Utilizes JWT for robust authentication.
   - Implements role-based access control to ensure proper permissions.

3. **Scalable**:
   - Built with Node.js and Express.js for high performance.
   - MongoDB allows for scalable and flexible data storage.

4. **Maintainable**:
   - Organized codebase with a RESTful API structure.
   - Clear separation of concerns for different features (e.g., tours, users, reviews).

---

## Contributing

If you'd like to contribute to Natours, please fork the repository and submit a pull request. For major changes, please open an issue to discuss your ideas first.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
