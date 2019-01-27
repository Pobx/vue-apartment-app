import axios from "axios";
import { API } from "./api-base";

export function getPartnersByRentersId(id) {
  return axios.get(`${API}/renters-partners-by-renter-id/${id}`);
}

export function removePartnersById(id) {
  let data = { id: id, status: "disabled" };
  return axios.put(`${API}/renters-partners/remove-partner`, data);
}

export function setPartners(data) {
  if (data.id == 0) {
    return axios.post(`${API}/renters-partners/create`, data);
  } else {
    return axios.put(`${API}/renters-partners/update`, data);
  }
}
