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
      avatar: '',
      cover: '',
      introduction: '',
    },
    isAuthenticated: false,
    token: '',
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
      localStorage.removeItem('userId')
    },
  },
  actions: {
    // 確認使用者登入狀態
    async fetchCurrentUser ({ commit }) {
      try {
        const Id = localStorage.getItem('userId')
        const { userId } = { userId: Id }
        const { data } = await usersAPI.getUser({ userId })
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        const { id, account, name, avatar, cover, introduction } = data
        commit('setCurrentUser', {
          id,
          account,
          name,
          avatar,
          cover,
          introduction
        })
        console.log('setCurrentUser')
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
