import axios from "axios";
import { API } from "./api-base";

export function getMonthlyUsageByRoomsId(rooms_id = null) {
  return axios.get(`${API}/utilities-monthly-usage-by-rooms-id/${rooms_id}`);
}

export function setMonthlyUsage(params) {
  if (params.id == 0) {
    return axios.post(`${API}/utilities-monthly-usage/create`, params);
  } else {
    return axios.put(`${API}/utilities-monthly-usage/update`, params);
  }
}
