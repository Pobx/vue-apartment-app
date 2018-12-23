import axios from "axios";
import { API } from "./api-base";

export function getRenters() {
  return axios.get(`${API}/renters`);
}

export function getRenterProfileById(id) {
  return axios.get(`${API}/renters-by-id/${id}`);
}

export function setRenters(data) {
  if (data.id == 0) {
    return axios.post(`${API}/renters/create`, data);
  } else {
    return axios.put(`${API}/renters/update`, data);
  }
}
