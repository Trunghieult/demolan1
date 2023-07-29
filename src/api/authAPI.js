import axiosClient from "./axiosClient";
import * as URL from "../utils/constants";

const authAPI = {
  login: (account) => {
    return axiosClient.post(URL.LOGIN_URL, account);
  },
  refreshToken: () => {
    const refreshTk = localStorage.get("rfToken");
    return axiosClient.post(URL.REFRESHTOKEN_URL, { refreshToken: refreshTk });
  },

  logout: () => {
    return axiosClient.post(URL.LOGOUT_URL);
  },

  updateUser: (info) => {
    return axiosClient.put(URL.UPDATE_USER_URL, info);
  },
  getInfoUser: (id) => {
    const url = id ? `${URL.GET_INFO_URL}/${id}` : URL.GET_INFO_URL;
    return axiosClient.get(url);
  },
  getFiendList: () => {
    return axiosClient.get(URL.FRIEND_URL);
  },

  register: (info) => {
    return axiosClient.post(URL.REGISTER_URL, info);
  },
  forgotPassword: (data) => {
    const url = `${URL.FORGOT_URL}/${data.email}`;
    return axiosClient.post(url);
  },
  resetPassword: (data) => {
    const newData = {
      password: data.newPassword,
      passwordToken: data.passwordToken,
    };
    return axiosClient.put(URL.RESET_URL, newData);
  },
};
export default authAPI;
