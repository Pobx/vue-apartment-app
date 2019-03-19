import axios from "axios";
import { API } from "./api-base";
import { CONFIG } from "./api-config";

export function getRooms() {
  return axios.get(`${API}/rooms`, CONFIG);
}

export function getRoomsByApartmentsId(id = null) {
  return axios.get(`${API}/rooms-by-apartment-id/${id}`, CONFIG);
}

export function getRoomsById(id =null) {
  return axios.get(`${API}/rooms-by-id/${id}`, CONFIG);
}

export function setRooms(data) {
  if (data.id == 0) {
    return axios.post(`${API}/rooms/create`, data, CONFIG);
  } else {
    return axios.put(`${API}/rooms/update`, data, CONFIG);
  }
}
