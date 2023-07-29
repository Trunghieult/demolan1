// api/axiosClient.js
import axios from "axios";
import authAPI from "./authAPI";
import { REFRESHTOKEN_URL } from "~/utils/constants";

// Set up default config for http requests here
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "content-type": "application/json",
  },
  timeout: 20000,
});
axiosClient.interceptors.request.use(async (config) => {
  const token = await localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 403 &&
      !originalRequest._retry &&
      (error.response?.data.message === "invalid token" ||
        error.response?.data.message === "outdated token")
    ) {
      originalRequest._retry = true;
      const rfToken = localStorage.getItem("rfToken");
      try {
        const res = await axios.post(
          " https://vacation-social-network.onrender.com/auth/refresh",
          {},
          {
            headers: {
              "content-type": "application/json",
              Authorization: rfToken,
            },
          }
        );
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + res.data.data.accessToken;
        localStorage.setItem("token", "Bearer " + res.data.data.accessToken);
        return axiosClient(originalRequest);
      } catch (error) {
        localStorage.removeItem("rfToken");
        localStorage.removeItem("token");
        window.location.reload();
      }
    } else {
      return Promise.reject(error);
    }
  }
);
export default axiosClient;
