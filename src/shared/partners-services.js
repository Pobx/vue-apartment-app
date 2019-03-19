import axios from "axios";
import { API } from "./api-base";
import { CONFIG } from "./api-config";

export function getPartnersByRentersId(id) {
  return axios.get(`${API}/renters-partners-by-renter-id/${id}`, CONFIG);
}

export function removePartnersById(data) {
  return axios.put(`${API}/renters-partners/remove-partner`, data, CONFIG);
}

export function setPartners(data) {
  if (data.id == 0) {
    return axios.post(`${API}/renters-partners/create`, data, CONFIG);
  } else {
    return axios.put(`${API}/renters-partners/update`, data, CONFIG);
  }
}
