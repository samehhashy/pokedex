import Vue from 'vue'
import axios from 'axios'

const globalAxios = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 20000
})

Vue.prototype.$axios = globalAxios

// export default globalAxios
