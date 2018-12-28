import axios from "axios";
import { API } from "./api-base";

export function getPartnersByRentersId(id) {
  return axios.get(`${API}/renters-partners-by-renter-id/${id}`);
}
