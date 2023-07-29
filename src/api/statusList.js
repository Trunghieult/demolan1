import axiosClient from "./axiosClient";
import * as URL from "../utils/constants";

const statusAPI = {
  statusList: (data) => {
    const url = `${URL.STATUS_URL}?type=${data.type}&listType=${data.listType}&id=${data.id}&page=${data.page}`;
    return axiosClient.get(url);
  },
  searchList: (data) => {
    const url = `${URL.STATUS_URL}/search?type=${data.type}&listType=${data.listType}&id=${data.id}&page=${data.page}&value=${data.value}`;
    return axiosClient.get(url);
  },
};

export default statusAPI;
