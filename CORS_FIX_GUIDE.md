# CORS Policy Error regarding Loopback Address

## The Issue
When your frontend is deployed to Vercel (e.g. `https://green-ai-website.vercel.app`), the browser loads the app securely over HTTPS. Within the deployed web app, making network requests to `http://localhost:5000` is blocked by the browser.

This happens for two main reasons:
1. **Private Network Access / CORS restrictions:** Browsers block public, secure contexts (`https://...`) from making requests to local or private IP addresses (`http://localhost...`) to prevent malicious websites from attacking internal networks.
2. **Localhost refers to the user's computer:** The URL `localhost` refers to the machine running the browser viewing the webpage, rather than the place where your database server actually lives. When users visit your deployed Vercel app, making a request to `localhost` tries to hit a server *on their own computer*, instead of your backend server deployed on Render.

## The Solution
To fix this, the frontend must dynamically point its requests to the proper backend URL based on its environment (local vs production). 

Your app already contained the `api.config.js` file, which defined `API_BASE_URL` appropriately determining whether to use `http://localhost:5000` (for local development) or `https://greenai-website-webservice.onrender.com` (for production out on the web like Vercel).

The error originated because `AdminPanel.jsx` and `GAIlogin.jsx` still had hardcoded values pointing to `http://localhost:5000`.

### Changes Made:
- Imported `API_BASE_URL` from the configuration in `AdminPanel.jsx` and `GAIlogin.jsx`.
- Replaced the hardcoded strings (e.g., `'http://localhost:5000/api/admin/users'`) with dynamic template literals referencing the correct URL (e.g., `` `${API_BASE_URL}/api/admin/users` ``).

Now, when you use the app locally it will still query `localhost`, but once deployed via Vercel, it will query your live production backend on Render!
