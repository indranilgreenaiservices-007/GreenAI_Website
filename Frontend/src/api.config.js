// Dynamically determine the API Base URL based on the current hostname
// This allows testing on both localhost and local network IPs (e.g., 192.168.x.x)
const hostname = window.location.hostname;

// If we are in development (on port 5173), we point to port 5000


const API_BASE_URL =
  port === "5173" ||
  hostname === "localhost" ||
  hostname.startsWith("127.") ||
  hostname.startsWith("192.168.")
    ? "http://localhost:5000" // Local backend
    : "https://greenai-website-webservice.onrender.com"; // Render backend

export default API_BASE_URL;
