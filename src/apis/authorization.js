import { apiHelper } from '../utils/helpers'

export default {
  userSignIn ({ account, password }) {
    // return Promise
    return apiHelper.post('/login', { account, password })
  },
  adminSignIn ({ account, password }) {
    // return Promise
    return apiHelper.post('/admin/login', { account, password })
  }
}
