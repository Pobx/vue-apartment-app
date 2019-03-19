import axios from "axios";
import { API } from "./api-base";
import { CONFIG } from "./api-config";

export function getPackages() {
  return axios.get(`${API}/utilities-packages`, CONFIG);
}

export function setPackages(data) {
  if (data.id == 0) {
    return axios.post(`${API}/utilities-packages/create`, data, CONFIG);
  } else {
    return axios.put(`${API}/utilities-packages/update`, data, CONFIG);
  }
}
