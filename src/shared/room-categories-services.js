import axios from "axios";
import { API } from "./api-base";
import { CONFIG } from "./api-config";

export function getRoomCategories() {
  return axios.get(`${API}/room-categories`, CONFIG);
}

export function setRoomCategories(data) {
  if (data.id == 0) {
    return axios.post(`${API}/room-categories/create`, data, CONFIG);
  } else {
    return axios.put(`${API}/room-categories/update`, data, CONFIG);
  }
}
