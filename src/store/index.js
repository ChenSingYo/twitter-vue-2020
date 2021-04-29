import Vue from 'vue'
import Vuex from 'vuex'
import usersAPI from './../apis/users'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      account: '',
      name: '',
      email:'',
      avatar: '',
      cover: '',
      introduction: '',
      role:''
    },
    userFollowCount: {
      id: -1,
      following: -1,
      follower: -1
    },
    isAuthenticated: false,
    token: '',
    isReloadPost: false,
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser,
      }
      state.isAuthenticated = true
      state.token = localStorage.getItem('token')
    },
    revokeCurrentUser (state) {
      state.currentUser = {}
      state.isAuthenticated = false
      state.token = ''
      localStorage.removeItem('token')
    },
    setReloadPost(state, reloadState) {
      state.isReloadPost = reloadState
    },
    setUserFollowCount (state, userFollowCount) {
      state.userFollowCount = {
        ...state.userFollowCount,
        ...userFollowCount
      }
    },
    setUserFollowingCount(state, count) {
      state.userFollowCount.following += count
    }
  },
  actions: {
    // 確認使用者登入狀態
    async fetchCurrentUser ({ commit }) {
      try {
        const { data } = await usersAPI.getCurrentUser()
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        const { id, account, name, email, avatar, cover, introduction, role } = data
        commit('setCurrentUser', {
          id,
          account,
          name,
          email,
          avatar,
          cover,
          introduction,
          role
        })
        return true
      } catch (err) {
        console.log(err)
        commit('revokeCurrentUser')
        console.log('revokeCurrentUser')
        return false
      }
    }
  },
  modules: {
  }
})
