// src/api/api.js
import axios from "axios";

// Create axios instance with base configuration
const api = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL || "https://api.openlaboratory.fi/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Common utility function to handle API errors
export const handleApiError = (error) => {
  const message =
    error.response?.data?.message || error.message || "Something went wrong";
  console.error("API Error:", message);
  return message;
};

export default api;
