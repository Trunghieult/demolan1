import axiosClient from "./axiosClient";
import * as URL from "../utils/constants";

const searchAPI = {
  searchOneModel: (data) => {
    const url = `${URL.SEARCH_URL}/${data.model}?value=${data.value}&page=${data.page}`;
    return axiosClient.get(url);
  },
};

export default searchAPI;
