import axiosClient from "./axiosClient";
import * as URL from "../utils/constants";

const notiAPI = {
  getList: (page) => axiosClient.get(`${URL.GET_NOTI_URL}?page=${page}`),
  updateStatusAll: () => axiosClient.put(URL.UPDATE_ALL_NOTI_URL),
  updateStatusOne: (id) => axiosClient.put(`${URL.UPDATE_ONE_NOTI_URL}/${id}`),
};
export default notiAPI;
