import axios from "axios";
import { API } from "./api-base";

export function getPackages() {
  return axios.get(`${API}/utilities-packages`);
}

export function setPackages(data) {
  if (data.id == 0) {
    return axios.post(`${API}/utilities-packages/create`, data);
  } else {
    return axios.put(`${API}/utilities-packages/update`, data);
  }
}
