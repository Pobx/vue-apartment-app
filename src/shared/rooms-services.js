import axios from "axios";
import { API } from "./api-base";

export function getRooms() {
  return axios.get(`${API}/rooms`);
}

export function setRooms(data) {
  if (data.id == 0) {
    return axios.post(`${API}/rooms/create`, data);
  } else {
    return axios.put(`${API}/rooms/update`, data);
  }
}
