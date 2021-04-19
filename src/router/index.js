import Vue from 'vue'
import VueRouter from 'vue-router'
import TweetsMain from '../views/TweetsMain.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'tweets-main',
    component: TweetsMain
  },
  {
    path: '/profile',
    name: 'user-profile',
    component: () => import('../views/UserProfile.vue'),
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('../views/UserAccountSetting.vue'),
  }
  
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
