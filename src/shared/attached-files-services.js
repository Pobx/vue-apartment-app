import axios from "axios";
import { API } from "./api-base";

export function setAttachedFile(params) {
  if (params.id == 0) {
    return axios.post(`${API}/renters-attached-files/create`, params);
  } else {
    return axios.put(
      `${API}/renters-attached-files/update-attached-file-by-renters-id`,
      params
    );
  }
}

export function getAttachedFilesByRentersId(id) {
  return axios.get(`${API}/renters-attached-files-by-renters-id/${id}`);
}

export function removeAttachedFiles(params) {
  return axios.put(
    `${API}/renters-attached-files/remove-attached-file`,
    params
  );
}
