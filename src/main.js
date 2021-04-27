import Vue from 'vue'
import App from './App.vue'
import router from './router'

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
import { cstBackIcon, cstBell, cstBellCheck, cstIsLike } from './assets/icon/custom-icon'

import store from './store'

Unicon.add([
  uniMultiply,
  uniCameraPlus,
  uniEnvelope,
  uniComment,
  uniHeartAlt,
  cstBackIcon,
  cstBell,
  cstBellCheck,
  cstIsLike
])
Vue.use(Unicon)
//

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
