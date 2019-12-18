import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'

import('@/assets/style/main.scss')

console.log(process.env.VUE_APP_BASE_URL)

const globalAxios = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 20000
})

Vue.prototype.$axios = globalAxios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
