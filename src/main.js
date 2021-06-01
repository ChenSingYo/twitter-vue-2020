import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { vueSocketIO } from './utils/helpers'

// reset css
import './assets/normalize.css'

// common css
import './assets/application.css'

// vue icon
import Unicon from 'vue-unicons/dist/vue-unicons-vue2.umd'
import {
  uniMultiply,
  uniCameraPlus,
  uniEnvelope,
  uniComment,
  uniHeartAlt
} from 'vue-unicons/dist/icons'

// custom icon
import {
  cstBackIcon,
  cstBell,
  cstBellCheck,
  cstIsLike,
  cstAddMessage,
  cstFeather
} from './assets/icon/custom-icon'

Unicon.add([
  uniMultiply,
  uniCameraPlus,
  uniEnvelope,
  uniComment,
  uniHeartAlt,
  cstBackIcon,
  cstBell,
  cstBellCheck,
  cstIsLike,
  cstAddMessage,
  cstFeather
])
Vue.use(Unicon)

Vue.use(vueSocketIO)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
