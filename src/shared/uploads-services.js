import axios from "axios";
import { API } from "./api-base";

export function uploadImages(data, config) {
  return axios.post(`${API}/uploads/image`, data, config);
}
