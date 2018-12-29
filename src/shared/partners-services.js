import axios from "axios";
import { API } from "./api-base";

export function getPartnersByRentersId(id) {
  return axios.get(`${API}/renters-partners-by-renter-id/${id}`);
}

export function removePartnersById(id) {
  let data = { id: id, status: "active" };
  return axios.put(`${API}/renters-partners/remove-partner`, data);
}
