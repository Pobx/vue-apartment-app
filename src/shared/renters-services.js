import axios from "axios";
import { API } from "./api-base";
import { CONFIG } from "./api-config";

export function getRenters() {
  return axios.get(`${API}/renters`, CONFIG);
}

export function getRenterProfileById(id) {
  return axios.get(`${API}/renters-by-id/${id}`, CONFIG);
}

export function setRenters(data) {
  if (data.id == 0) {
    return axios.post(`${API}/renters/create`, data, CONFIG);
  } else {
    return axios.put(`${API}/renters/update`, data, CONFIG);
  }
}

export function updateRentersStatus(data) {
  return axios.put(`${API}/renters/update-status`, data, CONFIG);
}
