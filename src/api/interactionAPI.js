import axiosClient from "./axiosClient";
import * as URL from "../utils/constants";

const interactionAPI = {
  getLikedList: (data) => {
    const url = `${URL.REACT_URL}?id=${data.id}&type=${data.type}&page=${data.page}`;
    return axiosClient.get(url);
  },
  updateLike: (data) => {
    const url = `${URL.REACT_URL}?id=${data.id}&type=${data.type}`;
    return axiosClient.put(url);
  },
  getCommentList: (data) => {
    const url = `${URL.COMMENT_URL}?id=${data.id}&type=${data.type}&page=${data.page}`;
    return axiosClient.get(url);
  },
  addComment: (data) => {
    const url = `${URL.COMMENT_URL}?id=${data.id}&type=${data.type}`;
    return axiosClient.post(url, { content: data.content });
  },
  updateComment: (data) => {
    const url = `${URL.COMMENT_URL}/${data.id}`;
    return axiosClient.put(url, { content: data.content });
  },
  deleteComment: (id) => {
    const url = `${URL.COMMENT_URL}/${id}`;
    return axiosClient.delete(url);
  },
};

export default interactionAPI;
