import { apiHelper } from '../utils/helpers'

export default {
  signUp ({ account, name, email, password, confirmPassword }) {
    return apiHelper.post('/users', { account, name, email, password, confirmPassword })
  }
}
