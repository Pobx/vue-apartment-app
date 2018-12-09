import axios from "axios";
import { API } from "./api-base";

export function getRoomCategories() {
  return axios.get(`${API}/room-categories`);
}

export function setRoomCategories(data) {
  if (data.id ==0) {
    return axios.post(`${API}/room-categories/create`, data);
  }else {
    return axios.put(`${API}/room-categories/update`, data);
  }
}