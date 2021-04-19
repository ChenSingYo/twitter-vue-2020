import Vue from 'vue'
import VueRouter from 'vue-router'
import TweetsMain from '../views/TweetsMain.vue'
import UserLogin from './../views/UserLogin.vue'
import UserRegist from './../views/UserRegist.vue'

Vue.use(VueRouter)

const routes = [
  // root
  {
    path: '/',
    name: 'root',
    redirect: '/login'
  },
  // user login
  {
    path: '/login',
    name: 'user-login',
    component: UserLogin
  },
  // user regist
  {
    path: '/regist',
    name: 'user-regist',
    component: UserRegist
  },
  {
    path: '/tweets',
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
  },
  // not found
  {
    path: '*',
    name: 'not-found',
    component: () => import('./../views/NotFound.vue')
  }
  
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
