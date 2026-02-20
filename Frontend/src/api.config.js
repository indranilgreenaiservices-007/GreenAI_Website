// Dynamically determine the API Base URL based on the current hostname
// This allows testing on both localhost and local network IPs (e.g., 192.168.x.x)
const hostname = window.location.hostname;

// If we are in development (on port 5173), we point to port 5000
const API_BASE_URL = window.location.port === '5173' || hostname === 'localhost' || hostname.startsWith('127.0.0.1') || hostname.startsWith('192.168.')
    ? `http://${hostname}:5000`
    : ""; // Put your production link here like "https://api.greenai.com"

export default API_BASE_URL;
