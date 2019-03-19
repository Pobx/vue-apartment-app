import axios from "axios";
import { API } from "./api-base";
import { CONFIG } from "./api-config";

export function getUtilitiesCategories() {
  return axios.get(`${API}/utilities-categories`, CONFIG);
}

export function getUtilitiesCategoriesById(id = null) {
  return axios.get(`${API}/utilities-categories-by-id/${id}`, CONFIG);
}

export function setUtilitiesCategories(data) {
  if (data.id == 0) {
    return axios.post(`${API}/utilities-categories/create`, data, CONFIG);
  } else {
    return axios.put(`${API}/utilities-categories/update`, data, CONFIG);
  }
}
