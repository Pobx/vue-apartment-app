import { authHeader } from "./auth-header";
export const CONFIG = {
  headers: { "api-token": authHeader() }
};
