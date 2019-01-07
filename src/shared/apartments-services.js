import axios from "axios";
import { API } from "./api-base";

export function getApartments() {
  return axios.get(`${API}/apartments`);
}

export function setApartments(data) {
  if (data.id == 0) {
    return axios.post(`${API}/apartments/create`, data);
  } else {
    return axios.put(`${API}/apartments/update`, data);
  }
}
