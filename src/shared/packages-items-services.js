import axios from "axios";
import { API } from "./api-base";

export function getPackagesItems() {
  return axios.get(`${API}/utilities-package-items`);
}

export function getPackagesItemsByPackagesId(id) {
  return axios.get(`${API}/utilities-package-items-by-packages-id/${id}`);
}

export function setPackagesItems(data) {
  if (data.id == 0) {
    return axios.post(`${API}/utilities-package-items/create`, data);
  } else {
    return axios.put(`${API}/utilities-package-items/update`, data);
  }
}
