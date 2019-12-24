import axios from "axios";

export const globalAxios = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 10000
});

export default globalAxios;
