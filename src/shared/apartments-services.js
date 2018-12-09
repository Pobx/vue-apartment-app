import axios from "axios";
import { API } from "./api-base";

export function getApartments() {
  return axios.get(`${API}/apartments`);
}

export function addApartments(data) {
  return axios.post(`${API}/apartments/create`);
}

export function updateApartments(data) {
  return axios.post(`${API}/apartments/update`);
}
