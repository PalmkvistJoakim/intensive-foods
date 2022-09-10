import http from "./httpService";
import config from "../services/config.json";

export function getFoods() {
  return http.get(config.apiEndpointFoods);
}

export function getFood(id) {
  return http.get(`${config.apiEndpointFoods}/${id}`);
}

export function saveFood(data) {
  const { _id: dataId, ...food } = data;

  if (dataId) return http.put(`${config.apiEndpointFoods}/${dataId}`, food);
  return http.post(config.apiEndpointFoods, food);
}

export function deleteFood(id) {
  return http.delete(`${config.apiEndpointFoods}/${id}`);
}
