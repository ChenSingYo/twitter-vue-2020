import { apiHelper } from '../utils/helpers'

export default {
  signUp ({ account, name, email, password, checkPassword }) {
    return apiHelper.post('/users', { account, name, email, password, checkPassword })
  },
  getUser({ userId }) {
    return apiHelper.get(`/users/${userId}`)
  }
}
