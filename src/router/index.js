import Vue from 'vue'
import Router from 'vue-router'
import Bitcoin from '../components/Bitcoin'
import Home from '../components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      name: 'Home',
      component: Home
    },
    {
      path: '/:bitcoinId',
      name: 'Bitcoin',
      component: Bitcoin
    },
  ],
  mode:'history'
})
