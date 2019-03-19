import axios from "axios";
import { API } from "./api-base";
import { CONFIG } from "./api-config";

export function getPackagesItems() {
  return axios.get(`${API}/utilities-package-items`, CONFIG);
}

export function getPackagesItemsByPackagesId(id) {
  return axios.get(`${API}/utilities-package-items-by-packages-id/${id}`, CONFIG);
}

export function setPackagesItems(data) {
  if (data.id == 0) {
    return axios.post(`${API}/utilities-package-items/create`, data, CONFIG);
  } else {
    return axios.put(`${API}/utilities-package-items/update`, data, CONFIG);
  }
}
