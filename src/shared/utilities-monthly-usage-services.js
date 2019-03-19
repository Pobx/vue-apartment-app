import axios from "axios";
import { API } from "./api-base";
import { CONFIG } from "./api-config";

export function getMonthlyUsageByRoomsId(rooms_id = null) {
  return axios.get(`${API}/utilities-monthly-usage-by-rooms-id/${rooms_id}`, CONFIG);
}

export function setMonthlyUsage(params) {
  if (params.id == 0) {
    return axios.post(`${API}/utilities-monthly-usage/create`, params, CONFIG);
  } else {
    return axios.put(`${API}/utilities-monthly-usage/update`, params, CONFIG);
  }
}
