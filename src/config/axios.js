import axios from "axios";
import localStorage from "../services/localStorage";
import { BASE_BACKEND_URL } from "./constants";

axios.defaults.baseURL = BASE_BACKEND_URL;

axios.interceptors.request.use (
   config => {
      if (config.url.includes("/login") || config.url.includes("/register")) {
         return config;
      }

      const token = localStorage.getToken();
      if (token) {
         config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
   },
   err => {
      Promise.reject(err);
   }
);

axios.interceptors.response.use (
   response => {
      return response;
   },
   err => {
      if (err.response?.status === 401) {
         localStorage.clearToken();
         alert("Please login again")
         window.location = "/";
         return Promise.reject(err);
      }
      return Promise.reject(err)
   }
);

export default axios;