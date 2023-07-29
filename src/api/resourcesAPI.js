import axiosClient from "./axiosClient";
import * as URL from "../utils/constants";

const resourceAPI = {
  getAvatar: (data) => {
    const url = ["page", "userId"].reduce(
      (str, item) => (data[item] ? str.concat(`${item}=${data[item]}&`) : str),
      `${URL.RESOURCE_ROUTE}?field=avatar&`
    );

    return axiosClient.get(url);
  },
  uploadFile: (data) => {
    return axiosClient.post(URL.RESOURCE_URL, data);
  },
  deleteImg: (id) => {
    return axiosClient.delete(`${URL.RESOURCE_URL}/${id}`);
  },
};
export default resourceAPI;
