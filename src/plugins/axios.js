import Vue from "vue";
import axios from "axios";

const globalAxios = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
  timeout: 10000
});

Vue.prototype.$axios = globalAxios;

export default globalAxios;
