import Vue from 'vue'
import App from './App.vue'
import store from './store'
import * as filters from './utils/filters'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import { ModalPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(ModalPlugin)