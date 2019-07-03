import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueMeta from 'vue-meta'
import App from './App'
import VueResource from 'vue-resource'
//import VueWebsocket from "vue-websocket"
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
//import VueSocketIO from 'vue-socket.io'
//import store from '../db'
/*
import VueNativeSock from 'vue-native-websocket'

Vue.use(VueNativeSock, 'ws://localhost:8080', {
  connectManually: true,
})

const vm = new Vue()
// Connect to the websocket target specified in the configuration
vm.$connect()
// Connect to an alternative websocket URL and Options e.g.
vm.$connect('ws://localhost:8080/', { format: 'json' })
// do stuff with WebSockets
vm.$disconnect()
*/

/*
import VueWebsocket from "vue-websocket"
Vue.use(VueWebsocket, "ws://localhost:8080/");
*/
Vue.config.productionTip = false
/*
Vue.use(new VueSocketIO({
  debug: true,
  connection: 'ws://localhost:8080/'
}))
*/
Vue.use(VueResource,VueAxios, axios, BootstrapVue)
Vue.use(VueMeta)

new Vue({
  el: '#app',
  router,
  //vm,
  render: h => h(App)
})
