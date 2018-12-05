import axios from 'axios';
import { API } from './api-base';

export function getApartments() {
  return axios.get(`${API}/apartments`)
} 