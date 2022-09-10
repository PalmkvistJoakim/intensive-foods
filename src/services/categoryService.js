import http from "./httpService";
import config from "../services/config.json";

export function getCategories() {
  return http.get(config.apiEndpointCategories);
}
