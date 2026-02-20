# GreenAI Backend System Implementation Guide

This guide details the internal workings of the GreenAI backend system, explaining the architecture, security mechanisms (JWT, Bcrypt), data storage, and access control. It is designed to help you understand the system so you can customize and extend it.

## 1. High-Level Architecture

The backend is built using the **MERN Stack** (specifically Node.js, Express, and MongoDB). It follows the **MVC (Model-View-Controller)** pattern, although in a REST API, the "View" is the JSON response sent to the frontend.

**Data Flow:**
1.  **Client Request**: The frontend sends an HTTP request (e.g., `POST /api/auth/login`).
2.  **Server (`server.js`)**: The entry point receives the request and routes it based on the URL.
3.  **Router (`routes/`)**: Maps the specific URL endpoint to a controller function.
4.  **Middleware (`middleware/`)**: Intercepts the request to check for authorization (valid token) or roles (Admin/HR).
5.  **Controller/Logic**: Executes the business logic (e.g., finding a user, checking passwords).
6.  **Model (`models/`)**: Interacts with the MongoDB database to fetch or save data.
7.  **Response**: The server sends a JSON response back to the client.

---

## 2. Schema Backing (Data Modeling)

We use **Mongoose** to model application data. Mongoose provides a schema-based solution to model your application data, enforcing structure, type validation, and default values.

### Example: User Schema (`models/User.js`)

```javascript
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false }, // 'select: false' hides password by default in queries
    role: { 
        type: String, 
        enum: ['admin', 'hr', 'employee'], // Enforces specific roles
        default: 'employee' 
    },
    // ...
});
```

**Why this matters:**
-   **Validation**: Prevents bad data (e.g., missing email) from entering the database.
-   **Structure**: Defines exactly what fields correspond to a user.
-   **Hooks**: Allows automatic actions (like hashing passwords) before saving.

**How to Customize:**
To add a new field (e.g., `phoneNumber`), simply add it to the schema object in the relevant model file.

---

## 3. Security & Authentication

We use strictly industry-standard security practices: **Bcrypt** for password hashing and **JWT** for stateless authentication.

### A. Bcrypt (Password Hashing)
**Concept**: Storing plain-text passwords is a massive security risk. If the DB is hacked, user passwords are stolen.
**Solution**: We run the password through a one-way mathematical function (hashing) using `bcryptjs`.

-   **Hashing on Save**: In `User.js`, we use a `pre('save')` hook. Before a user document is saved to the DB, it checks if the password field was modified. If so, it hashes it.
    ```javascript
    userSchema.pre('save', async function () {
        if (!this.isModified('password')) return;
        this.password = await bcrypt.hash(this.password, 12); // 12 is the salt rounds (complexity)
    });
    ```
-   **Verifying**: When logging in, we cannot "decrypt" the stored hash. Instead, we hash the *entered* password and compare the two hashes.
    ```javascript
    userSchema.methods.matchPassword = async function (enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password);
    };
    ```

### B. JWT (JSON Web Tokens)
**Concept**: We use **Stateless Authentication**. The server does not store active sessions in a database. Instead, it issues a "Token" (ID card) to the user upon login.
**Mechanism**:
1.  **Login**: User sends credentials. Server verifies them.
2.  **Sign**: Server generates a JWT using a private `JWT_SECRET` (in `.env`). This token contains the user's ID encrypted within it.
    -   *Code Location*: `utils/generateToken.js`
3.  **Issue**: Server sends the token to the client.
4.  **Store**: Frontend stores this token (usually in `localStorage` or `sessionStorage`).
5.  **verify**: For every subsequent request, the frontend must send this token in the `Authorization` header.

---

## 4. Access Control (Middleware)

Middleware functions run *before* the final route handler. They are the gatekeepers.

### A. Protecting Routes (`authMiddleware.js` -> `protect`)
This middleware ensures the user is logged in.
1.  It looks for the `Authorization` header (Format: `Bearer <token>`).
2.  It verifies the token using `jwt.verify()` and the `JWT_SECRET`.
3.  It decodes the user ID and fetches the user from the DB.
4.  It attaches the user object to the request (`req.user = user`).
5.  If any step fails, it returns a `401 Unauthorized` error.

### B. Role-Based Access Control (`authMiddleware.js` -> `admin`)
This middleware runs *after* `protect`. It checks `req.user.role`.
```javascript
const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next(); // User is allowed, proceed to controller
    } else {
        res.status(403).json({ message: 'Not authorized as an admin' });
    }
};
```

**How to Customize:**
To create a strictly "HR Only" route, you can create a new middleware in `authMiddleware.js`:
```javascript
const hrOnly = (req, res, next) => {
    if (req.user && (req.user.role === 'hr' || req.user.role === 'admin')) {
        next();
    } else {
        res.status(403).json({ message: 'HR access required' });
    }
};
```

---

## 5. API Flow Example: Login

1.  **Route**: `POST /api/auth/login` is hit.
2.  **Handler**: `routes/auth.js` -> `router.post('/login', ...)`
3.  **Process**: 
    -   Extracts `email`, `password` from `req.body`.
    -   Finds user: `User.findOne({ email }).select('+password')`.
    -   Checks password: `user.matchPassword(password)`.
4.  **Success**: 
    -   Calls `generateToken(user._id)`.
    -   Returns JSON: `{ _id, name, email, token, ... }`.

---

## 6. Storing Data

Data is stored in **MongoDB**.
-   **Local Development**: Likely connecting to a local instance or a bespoke Atlas URI from `.env`.
-   **Connection**: Handled in `config/db.js`.
-   **Environment Variables**: `MONGO_URI` in `.env` determines *where* the data lives.

## Summary Checklist for Customization

| Object | Location | Purpose | How to Customize |
| :--- | :--- | :--- | :--- |
| **Model** | `models/*.js` | Defines data structure | Add fields to Schema object |
| **Route** | `routes/*.js` | Defines URL endpoints | Add `router.get('/path', controller)` |
| **Logic** | `controllers/*.js` (or inline in routes) | Business logic | Write function to handle Request/Response |
| **Middleware** | `middleware/authMiddleware.js` | Permissions | Add new role checks |
| **Config** | `.env` | Secrets & Constants | Change Ports, Secrets, DB URIs |

---

### How to Add a New Feature (e.g., "Projects")

1.  **Model**: Create `models/Project.js` with a schema (title, description, status).
2.  **Controller**: Create `controllers/projectController.js` with functions (getProjects, createProject).
3.  **Routes**: Create `routes/projectRoutes.js`.
    -   Import controller functions.
    -   Define routes: `router.get('/', protect, getProjects)`.
4.  **Register**: In `server.js`, add `app.use('/api/projects', require('./routes/projectRoutes'))`.
