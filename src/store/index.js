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
    isAuthenticated: false,
    token: '',
    isReloadFollow: false
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
    setIsReloadFollow (state, reloadState) {
      state.isReloadFollow = reloadState
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
