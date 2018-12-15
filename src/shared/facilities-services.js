import axios from "axios";
import { API } from "./api-base";

export function getFacilities() {
  return axios.get(`${API}/facilities`);
}

export function setFacilities(data) {
  if (data.id == 0) {
    return axios.post(`${API}/facilities/create`, data);
  } else {
    return axios.put(`${API}/facilities/update`, data);
  }
}
