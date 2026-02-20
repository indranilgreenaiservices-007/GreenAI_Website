# Backend Architecture Overview

This document describes the function and importance of each file created for the `GreenAI_Website` authentication and employee management system.

## 1. Core Configuration & Server

### `server.js`
*   **Function**: The main entry point of the application. It initializes the Express app, connects to the database, sets up middleware (CORS, JSON parsing), and defines the base API routes (`/api/auth`, `/api/admin`).
*   **Importance**: Acts as the "traffic controller," receiving all requests and directing them to the appropriate logic.

### `config/db.js`
*   **Function**: Handles the connection to the MongoDB database using Mongoose.
*   **Importance**: Essential for all data persistence. Without this, the app cannot save or retrieve user data.

### `.env`
*   **Function**: Stores sensitive configuration variables like database connection strings (`MONGO_URI`) and encryption keys (`JWT_SECRET`).
*   **Importance**: Security. Keeps secrets out of the source code so they aren't accidentally exposed in version control.

## 2. Database Models

### `models/User.js`
*   **Function**: Defines the structure (schema) for a user in the database.
    *   **Fields**: `name`, `email`, `password` (hashed), `role` (admin/hr/employee), `needsPasswordChange`.
    *   **Methods**: Includes built-in logic to hash passwords before saving and to verify passwords during login.
*   **Importance**: The blueprint for user data. Ensures consistency and security (by hashing passwords automatically).

## 3. Middleware (Security)

### `middleware/authMiddleware.js`
*   **Function**: Contains two key functions:
    *   `protect`: Verifies the JWT token sent by the frontend (authentication). If valid, it attaches the user's data to the request.
    *   `admin`: Checks if the authenticated user has the `admin` role (authorization).
*   **Importance**: The gatekeeper. Prevents unauthorized users from accessing private routes and regular employees from performing admin actions.

## 4. API Routes (Business Logic)

### `routes/auth.js`
*   **Function**: Handles public and self-service authentication tasks.
    *   `POST /login`: Verifies email/password and returns a JWT token.
    *   `PUT /change-password`: Allows a logged-in user to update their password (protected route).
*   **Importance**: Controls the login flow and enforces the password update policy.

### `routes/admin.js`
*   **Function**: Handles administrative tasks. specific to user management.
    *   `GET /users`: Lists all employees.
    *   `POST /create-user`: Creates a new employee account.
    *   `PUT /users/:id`: Updates an employee's role/details.
    *   `DELETE /users/:id`: Removes a user.
*   **Importance**: Powers the "Access Management" panel that only admins can see, allowing them to manage the workforce.

## 5. Utilities & Scripts

### `utils/generateToken.js`
*   **Function**: Helper function to create a signed JSON Web Token (JWT) containing the user's ID.
*   **Importance**: Centralizes token logic, ensuring tokens are consistent (e.g., expiry time) across the app.

### `seedAdmin.js`
*   **Function**: A one-time script to check if an admin exists and, if not, create the initial "Super Admin" account.
*   **Importance**: Solves the "chicken and egg" problem of how to create the first user when the `create-user` route requires you to be logged in as an admin.
