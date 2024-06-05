// services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8800/api", // Use environment variable for flexibility
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },

  
});

export default api;
