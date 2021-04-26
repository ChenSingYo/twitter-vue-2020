import Vue from 'vue'
import VueRouter from 'vue-router'
import TweetsMain from '../views/TweetsMain.vue'
import UserLogin from './../views/UserLogin.vue'
import UserRegist from './../views/UserRegist.vue'
import AdminLogin from './../views/AdminLogin.vue'
import store from './../store'

Vue.use(VueRouter)

const authorizeIsAdmin = (to, from, next) => {
  const currentUser = store.state.currentUser
  console.log('currentUser:', currentUser)
  if (currentUser && !currentUser.role === 'admin') {
    next('/404')
    return
  }
  next()
}

const authorizeIsUser = (to, from, next) => {
  const currentUser = store.state.currentUser
  console.log('currentUser:', currentUser)
  if (currentUser.role !== 'user') {
    next('/login')
    return
  }
  next()
}

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
  // admin login
  {
    path: '/admin',
    name: 'admin-login',
    component: AdminLogin
  },
  // admin tweets
  {
    path: '/admin/tweets',
    name: 'admin-tweets',
    component: () => import('../views/AdminTweets.vue'),
    beforeEnter: authorizeIsAdmin
  },
  // admin users
  {
    path: '/admin/users',
    name: 'admin-users',
    component: () => import('../views/AdminUsers.vue'),
    beforeEnter: authorizeIsAdmin
  },
  {
    path: '/tweets',
    name: 'tweets-main',
    component: TweetsMain,
    beforeEnter: authorizeIsUser
  },
  {
    path: '/tweets/:id',
    name: 'tweet-page',
    component: () => import('../views/TweetPage.vue')
  },
  {
    path: '/profile',
    name: 'user-profile',
    component: () => import('../views/UserProfile.vue')
  },
  {
    path: '/profile/follow',
    name: 'user-follow',
    component: () => import('../views/UserFollow.vue')
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('../views/UserAccountSetting.vue'),
    beforeEnter: authorizeIsUser
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

router.beforeEach(async (to, from, next) => {
  console.log('to', to.name)

  // 取得 驗證狀態、role、token in local、token in Vuex
  let isAuthenticated = store.state.isAuthenticated
  const currentUserRole = store.state.currentUser.role
  const tokenInLocal = localStorage.getItem('token')
  const tokenInStore = store.state.token

  console.log('currentUser:', currentUserRole)

  // 如果有 token in local，而兩種token不同，則再次驗證
  if (tokenInLocal && tokenInLocal !== tokenInStore) {
    isAuthenticated = store.dispatch('fetchCurrentUser')
  }
  console.log('isAuthenticated', isAuthenticated)

  // 不需驗證 token 的頁面
  const pathsWithoutAuthentication = ['user-login', 'user-regist', 'admin-login']

  // token無效則轉到不需認證token的頁面
  if (!isAuthenticated && !pathsWithoutAuthentication.includes(to.name)) {
    next('/login')
    return
  }
  // token有效則轉址到首頁，按照使用／管理者身份轉址
  // if (isAuthenticated) {
  //   if (currentUserRole === 'user' && pathsWithoutAuthentication.includes(to.name)) {
  //     next('/tweets')
  //   } else if (currentUserRole === 'admin') {
  //     next('/admin/tweets')
  //   }
  //   return
  // }
  console.log('success to next page')
  next()
})

export default router
