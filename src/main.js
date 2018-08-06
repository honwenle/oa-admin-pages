import "babel-polyfill";
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import axios from 'axios'
import router from './router'

if (location.host.indexOf('localhost') > -1 || location.host.indexOf('127.0.0.1') > -1 || location.host.indexOf('192.168') > -1 || location.host.indexOf('106.14.96.237') > -1) {
  Vue.prototype.$isTest = true
  // Vue.prototype.$ApiUrl = 'http://106.14.96.237:8080'
  Vue.prototype.$ApiUrl = 'http://192.168.32.189:8080'
} else if (location.host.indexOf('lsoa.wzlstz.com') > -1) {
  Vue.prototype.$isTest = false
  Vue.prototype.$ApiUrl = 'http://lsoa.wzlstz.com:8080'
} else {
  Vue.prototype.$isTest = false
  Vue.prototype.$ApiUrl = 'http://106.14.78.135:8080'
}
axios.defaults.baseURL = Vue.prototype.$ApiUrl

Vue.prototype.$http = axios
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
