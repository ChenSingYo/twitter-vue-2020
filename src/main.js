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
import { cstBackIcon, cstBell, cstBellCheck } from './assets/icon/custom-icon'

Unicon.add([
  uniMultiply,
  uniCameraPlus,
  uniEnvelope,
  uniComment,
  uniHeartAlt,
  cstBackIcon,
  cstBell,
  cstBellCheck
])
Vue.use(Unicon)
//

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
