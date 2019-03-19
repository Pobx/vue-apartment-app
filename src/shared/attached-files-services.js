import axios from "axios";
import { API } from "./api-base";
import { CONFIG } from "./api-config";

export function setAttachedFile(params) {
  if (params.id == 0) {
    return axios.post(`${API}/renters-attached-files/create`, params, CONFIG);
  } else {
    // return axios.put(
    //   `${API}/renters-attached-files/update-attached-file-by-renters-id`,
    //   params
    // );
  }
}

export function getAttachedFilesByRentersId(id) {
  return axios.get(`${API}/renters-attached-files-by-renters-id/${id}`, CONFIG);
}

export function removeAttachedFiles(params) {
  return axios.put(
    `${API}/renters-attached-files/remove-attached-file`,
    params,
    CONFIG
  );
}
