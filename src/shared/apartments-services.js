import axios from "axios";
import { API } from "./api-base";
import { CONFIG } from "./api-config";

export function getApartments() {
  return axios.get(`${API}/apartments`, CONFIG);
}

export function setApartments(data) {
  if (data.id == 0) {
    return axios.post(`${API}/apartments/create`, data, CONFIG);
  } else {
    return axios.put(`${API}/apartments/update`, data, CONFIG);
  }
}
