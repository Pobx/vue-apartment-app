import axios from "axios";
import { API } from "./api-base";

export function setAttachedFile(data) {
  if (data.id == 0) {
    return axios.post(`${API}/renters-attached-files/create`, data);
  } else {
    return axios.put(`${API}/renters-attached-files/update-attached-file-by-renters-id`, data);
  }
}
