import Vue from 'vue'
import App from './App.vue'
import router from './router'

// reset css
import './assets/normalize.css';

// common css
import './assets/application.css';

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
