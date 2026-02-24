
# HR Access Restriction Documentation

This document explains how the **Access Control** (Access Management) card in the GAI Portal is restricted so that it is only visible to users with the `admin` role, effectively hiding it from HR and other non-admin staff.

## Implementation Details

The restriction is implemented using **Conditional Rendering** in the React frontend. Specifically, in the `GAIPortal.jsx` component, the system checks the `role` property of the logged-in user object before rendering the management card.

### Technical Breakdown

**File Location:** `Frontend\src\components\AdminPortal\GAIPortal.jsx`

The relevant code block is:

```javascript
{/* 4. Admin Access Management (Only for Admins) */}
{user?.role === 'admin' && (
    <div
        onClick={handleAdminAccess}
        className="bg-white rounded-2xl shadow-xl p-10 cursor-pointer hover:shadow-2xl transition-all hover:scale-105 border-2 border-transparent hover:border-purple-500 flex flex-col items-center text-center h-full group ring-2 ring-purple-100"
    >
        <div className="bg-purple-100 p-5 rounded-full mb-6 group-hover:bg-purple-200 transition-colors">
            <Shield className="h-10 w-10 text-purple-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
            Access Control
        </h3>
        <p className="text-gray-600 mb-6 text-sm flex-grow">
            Manage users, roles & permissions
        </p>
        <button className="mt-auto px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors w-full text-sm font-semibold">
            Manage Users
        </button>
    </div>
)}
```

### How it Works:

1.  **User State**: When the user logs in, their profile information (including their `role`) is stored in `localStorage` and then loaded into the component's `user` state via a `useEffect` hook.
2.  **Logic Gate**: The expression `{user?.role === 'admin' && (...)}` acts as a logic gate. 
    *   If `user.role` is exactly `'admin'`, the code inside the parentheses is evaluated and the UI card is rendered.
    *   If `user.role` is `'hr'`, `'employee'`, or any other value, the condition evaluates to `false`, and React skips rendering this entire block.
3.  **Security Layer**: In addition to this UI restriction, the `/gai-portal/admin` route is also protected in `App.jsx` using the `RequireAdmin` wrapper, which prevents unauthorized users from accessing the page even if they try to enter the URL manually.

---
*Created by GreenAI Development Team*
