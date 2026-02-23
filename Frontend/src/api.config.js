// Dynamically determine the API Base URL

const hostname = window.location.hostname;
const port = window.location.port;

const API_BASE_URL =
  port === "5173" ||
  hostname === "localhost" ||
  hostname.startsWith("127.") ||
  hostname.startsWith("192.168.")
    ? "http://localhost:5000" // Local backend
    : "https://greenai-website-webservice.onrender.com"; // Production backend

export default API_BASE_URL;