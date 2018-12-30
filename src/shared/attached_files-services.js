import axios from "axios";
import { API } from "./api-base";

export function setAttachedFile(data) {
  return axios.post(`${API}/renters-attached-files/create`, data);
}
