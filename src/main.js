import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
Vue.directive('elInputColor', {
  bind: function(el, binding) {
    if (binding.value) {
      if (el.querySelector('textarea')) {
        el.querySelector('textarea').style.color = binding.value
      } else if (el.querySelector('input')) {
        el.querySelector('input').style.color = binding.value
      }
    }
  },
  update: function(el, binding) {
    if (binding.value) {
      if (el.querySelector('textarea')) {
        el.querySelector('textarea').style.color = binding.value
      } else if (el.querySelector('input')) {
        el.querySelector('input').style.color = binding.value
      }
    }
  },
  inserted: function(el, binding) {
    if (binding.value) {
      if (el.querySelector('textarea')) {
        el.querySelector('textarea').style.color = binding.value
      } else if (el.querySelector('input')) {
        el.querySelector('input').style.color = binding.value
      }
    }
  }
})
/**
 * This project originally used easy-mock to simulate data,
 * but its official service is very unstable,
 * and you can build your own service if you need it.
 * So here I use Mock.js for local emulation,
 * it will intercept your request, so you won't see the request in the network.
 * If you remove `../mock` it will automatically request easy-mock data.
 */
import '../mock' // simulation data

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
