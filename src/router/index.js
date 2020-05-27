import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from '../App.vue'

Vue.use(VueRouter)
Vue.use(Vuex)

const routes = [
  {
    path: '/',
    name: 'Root',
    component: App
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
