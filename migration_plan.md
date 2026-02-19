# Migration Plan for Employee Portal

## 1. Current State Analysis (Source: `Greenai-services-pvt-ltd-fork`)
*   **Frontend**: `Employee.tsx` uses a hardcoded list of `AUTHORIZED_EMAILS` and a simple API call to `/employee/gailogin`.
*   **Backend**: The controller (`employee.controller.js`) is **insecure**:
    *   Uses a **hardcoded shared password** (`Greenai2024`) for all users.
    *   Validates emails against a hardcoded list in the code, rather than a database.
    *   Does not utilize the existing `User` model for this login flow.
    *   Returns a JWT token but lacks robust session management.

## 2. Recommended Architecture for `GreenAI_Website`

Since your `Backend` folder in `GreenAI_Website` is currently empty, you have the opportunity to build this correctly from scratch.

### A. MongoDB Schema (make new)
**Recommendation**: Create a robust `User` schema. Do not reuse the "hardcoded list" approach.
*   **Why**: Hardcoded lists require code deployments to add/remove employees. A database allows dynamic management.
*   **Schema Design**:
    ```javascript
    const mongoose = require('mongoose');
    const bcrypt = require('bcryptjs');

    const userSchema = new mongoose.Schema({
      name: { 
        type: String, 
        required: true 
      },
      email: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true 
      },
      password: { 
        type: String, 
        required: true, 
        select: false // Don't return password by default
      },
      role: { 
        type: String, 
        enum: ['employee', 'admin', 'hr'], 
        default: 'employee' 
      },
      lastLogin: Date,
      createdAt: { 
        type: Date, 
        default: Date.now 
      }
    });

    // Hash password before saving
    userSchema.pre('save', async function(next) {
      if (!this.isModified('password')) return next();
      this.password = await bcrypt.hash(this.password, 12);
      next();
    });

    // Method to check password
    userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
      return await bcrypt.compare(candidatePassword, userPassword);
    };

    module.exports = mongoose.model('User', userSchema);
    ```

### B. Authentication Feature
**Recommendation**: Implement individual user accounts.
1.  **Registration**: Create a script or an admin-only endpoint to register employees. This ensures each employee has their own unique email and password.
2.  **Login Flow**:
    *   Client sends `email` + `password`.
    *   Server finds user by `email`.
    *   Server compares `password` (using `bcrypt`).
    *   If valid, Server issued a JWT.

### C. Session Control
**Recommendation**: Use **HttpOnly Cookies** for better security (prevents XSS attacks), or stick to **JWT in localStorage** (simpler, match existing).
*   **Option 1 (Secure - Recommended)**:
    *   Server sends the JWT in an `httpOnly` cookie.
    *   Client API calls automatically include the cookie.
    *   **Pros**: Secure against XSS.
    *   **Cons**: slightly more complex frontend config (need `credentials: 'include'` in fetch/axios).
*   **Option 2 (Simple - As per source)**:
    *   Server returns JWT in JSON body.
    *   Frontend stores it in `localStorage.setItem('token', token)`.
    *   **Pros**: Easy to implement.
    *   **Cons**: Vulnerable to XSS (if your site runs malicious scripts, they can steal the token).

### D. Password Management
**Recommendation**: Enforce individual hashed passwords.
*   **Storage**: Never store plain text passwords (like "Greenai2024"). Always store the **hash**.
*   **Policy**: Enforce a minimum length (e.g., 8 chars).
*   **Recovery**: For MVP, an admin can reset passwords manually. Later, implement an email-based reset flow.

### E. Admin Creation (Bootstrapping)
**Question**: Who creates the admin first? Should I add their mail into code, making them admin?

**Recommendation**: Do NOT hardcode the admin email in the application code logic.
*   **Why**: Hardcoding invites security risks and makes the code inflexible (you can't change the admin without redeploying).
*   **Best Practice**: Use a **Seeding Script**.
    1.  Create a file `seedAdmin.js` in your backend.
    2.  This script connects to the DB, checks if an admin exists.
    3.  If not, it reads `ADMIN_EMAIL` and `ADMIN_PASSWORD` from your `.env` file and creates the user.
    4.  You run this script **once** manually (`node seedAdmin.js`) or automatically on server start.

**Example `seedAdmin.js`**:
```javascript
const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const seedAdmin = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    
    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
        await User.create({
            name: "Super Admin",
            email: process.env.ADMIN_EMAIL, // Read from .env
            password: process.env.ADMIN_PASSWORD, // Read from .env
            role: 'admin'
        });
        console.log("Admin created successfully!");
    } else {
        console.log("Admin already exists.");
    }
    process.exit();
};

seedAdmin();
```
**Benefits**:
*   Credentials stay in `.env` (not in git).
*   Code remains clean and reusable.

## 3. Action Plan

1.  **Initialize Backend**:
    *   Run `npm init -y` in `GreenAI_Website/Backend`.
    *   Install dependencies: `npm install express mongoose dotenv cors bcryptjs jsonwebtoken cookie-parser`.
2.  **Create Server**: Setup `server.js` with MongoDB connection.
3.  **Create Model**: Implement the `User` schema above.
4.  **Create Routes**:
    *   `POST /api/auth/login`
    *   `POST /api/auth/register` (protect this!)
5.  **Develop Seed Script**: 
    *   Create `seedAdmin.js`.
    *   Add `ADMIN_EMAIL` and `ADMIN_PASSWORD` to `.env`.
    *   Run the script to create your first user.
6.  **Migrate Frontend**:
    *   Copy `Employee.tsx` to `GreenAI_Website/Frontend/src/components/employee/`.
    *   **Crucial Change**: Remove the `AUTHORIZED_EMAILS` array. Let the backend handle authorization.
    *   **Crucial Change**: Update the `handleSubmit` function to call your NEW backend URL (e.g., `http://localhost:5000/api/auth/login`).
    *   Remove `employeeLogin` import and implement it using `fetch` or `axios` pointing to your new backend.

## 4. Summary of Changes in `Employee.tsx`

| Feature | Old Logic (Fork) | New Logic (Website) |
| :--- | :--- | :--- |
| **Auth Check** | Client-side list (`AUTHORIZED_EMAILS`) | **Server-side** Database lookup |
| **Password** | Hardcoded `Greenai2024` (Insecure) | **Individual** hashed passwords |
| **Session** | `localStorage` | `localStorage` or `HttpOnly Cookie` |
| **API** | `/employee/gailogin` | `/api/auth/login` |
| **Admin Creation** | N/A | **Seed Script** via `.env` |

This plan ensures your new portal is secure, scalable, and professional, avoiding the technical debt of the hardcoded legacy system.
