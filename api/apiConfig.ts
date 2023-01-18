import axios from "axios";
import { store } from "../store/index";
import { Tokens } from "../types/auth";
export const baseURL = "http://localhost:4000/";

const _api = axios.create({
  withCredentials: true,
  baseURL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

_api.interceptors.request.use((config) => {
  if (config && config.headers) {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      Tokens.Access
    )}`;
  }
  return config;
});

_api.interceptors.response.use(
  (config) => config,
  async (err) => {
    const originalRequest = err.config;
    if (
      err.response.status == 401 &&
      err.config &&
      err.config._isRetry !== true
    ) {
      originalRequest._isRetry = true;
      try {
        const _id = store.getState().auth.userId;
        const res = await await _api.get(`auth/refresh/${_id + ""}`);
        localStorage.setItem(Tokens.Access, res.data);
        return _api.request(originalRequest);
      } catch (err) {
        console.log("user not authorize", err);
        store.dispatch("logout");
      }
    }
    throw err;
  }
);

export default _api;
