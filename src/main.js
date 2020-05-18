import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import 'leaflet/dist/leaflet.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { LMap, LTileLayer, LMarker, LControlLayers } from 'vue2-leaflet'
import VueResource from 'vue-resource'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vuetify/dist/vuetify.min.css'

Vue.component('l-map', LMap)
Vue.component('l-tile-layer', LTileLayer)
Vue.component('l-marker', LMarker)
Vue.component('l-control-layers', LControlLayers)

Vue.config.productionTip = false
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(Vuetify)
Vue.use(VueResource)

new Vue({
  router,
  store,
  vuetify: new Vuetify(),
  render: h => h(App)
}).$mount('#app')
