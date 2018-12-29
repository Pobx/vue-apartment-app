import axios from "axios";
import { API } from "./api-base";

export function uploadImage(data) {
  return axios.post(`${API}/uploads/image`, data);
}
