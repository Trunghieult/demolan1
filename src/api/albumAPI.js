import axiosClient from "./axiosClient";
import * as URL from "../utils/constants";

const albumAPI = {
  getList: (data) => {
    const url = ["page", "userId"].reduce(
      (str, item) => (data[item] ? str.concat(`${item}=${data[item]}&`) : str),
      `${URL.ALBUM_ROUTE}?`
    );
    return axiosClient.get(url);
  },

  getDetail: (id) => axiosClient.get(`${URL.ALBUM_ROUTE}/${id}`),

  getAllImage: ({ id, page }) => axiosClient.get(`vacation/${id}/images?${page ? `page=${page}` : ""}`),
  createAlbum: (data) => axiosClient.post(URL.ALBUM_ROUTE, data),

  getAlbumPage: (data) => {
    const url = `${URL.ALBUMPAGE_ROUTE}/${data.albumId}?page=${data.page}`;
    return axiosClient.get(url);
  },

  createAlbumPage: (data) => axiosClient.post(URL.ALBUMPAGE_ROUTE, data),

  updateAlbumPage: ({ id, data }) => axiosClient.put(`${URL.ALBUMPAGE_ROUTE}/${id}`, data),

  delete: (id) => axiosClient.delete(`${URL.ALBUM_ROUTE}/${id}`),
};
export default albumAPI;
