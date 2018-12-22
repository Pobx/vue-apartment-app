import axios from "axios";
import { API } from "./api-base";

export function getUtilitiesCategories() {
  return axios.get(`${API}/utilities-categories`);
}

export function setUtilitiesCategories(data) {
  if (data.id == 0) {
    return axios.post(`${API}/utilities-categories/create`, data);
  } else {
    return axios.put(`${API}/utilities-categories/update`, data);
  }
}
