import axiosClient from "./axiosClient";
import * as URL from "../utils/constants";

const vacationAPI = {
  getListVacation: (data) => {
    const url = ["type", "page", "userId"].reduce(
      (str, item) => (data[item] ? str.concat(`${item}=${data[item]}&`) : str),
      `${URL.VACATION_URL}?`
    );
    return axiosClient.get(url);
  },
  getDetailVacation: (id) => {
    const url = `${URL.VACATION_URL}/${id}`;
    return axiosClient.get(url);
  },

  createVacation: (data) => {
    return axiosClient.post(URL.VACATION_URL, data);
  },
  updateVacation: (data) => {
    const url = `${URL.VACATION_URL}/${data.id}`;
    return axiosClient.put(url, data.body);
  },
  getManyPosts: (data) => {
    const url = `${URL.POST_URL}/${data.type}/${data.id}?page=${data.page}${
      data.timeline ? `&timeline=${data.timeline}` : ""
    }`;
    return axiosClient.get(url);
  },

  getOnePost: (id) => {
    const url = `${URL.POST_URL}/${id}`;
    return axiosClient.get(url);
  },

  createPost: (data) => {
    return axiosClient.post(URL.POST_URL, data);
  },

  updatePost: (data) => {
    const url = `${URL.POST_URL}/${data.id}`;
    return axiosClient.put(url, data.body);
  },

  deletePost: (id) => {
    const url = `${URL.POST_URL}/${id}`;
    return axiosClient.delete(url);
  },
};

export default vacationAPI;
