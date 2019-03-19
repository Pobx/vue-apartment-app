import axios from "axios";
import { API } from "./api-base";
import { CONFIG } from "./api-config";

export function getBillsByRoomsId(rooms_id = null) {
  return axios.get(`${API}/bills-by-rooms-id/${rooms_id}`, CONFIG);
}

export function getBillsByRoomsIdAndMonth(rooms_id = null, month) {
  return axios.get(`${API}/bills-by-rooms-id-and-month/create/${rooms_id}/${month}`, CONFIG);
}
