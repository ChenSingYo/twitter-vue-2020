
import axios from 'axios'
import Swal from 'sweetalert2'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'
import store from '../store'


const baseURL = 'https://simple-twitter-mysql.herokuapp.com'

const axiosInstance = axios.create({
  baseURL: baseURL + '/api'
})

const token = localStorage.getItem('token')

axiosInstance.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export const apiHelper = axiosInstance

// socket config
const connection = new SocketIO(baseURL, {
  reconnectionDelayMax: 10000,
  auth: {
    token: token
  }
})

export const vueSocketIO = new VueSocketIO({
  debug: true,
  connection,
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
})
// 

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
})



