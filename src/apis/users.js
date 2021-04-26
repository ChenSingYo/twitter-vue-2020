import { apiHelper } from '../utils/helpers'

export default {
  signUp({ account, name, email, password, confirmPassword }) {
    return apiHelper.post('/users', {
      account,
      name,
      email,
      password,
      confirmPassword
    })
  },
  getCurrentUserTweets({ id }) {
    return apiHelper.get(`/users/${id}/tweets`)
  },
  getCurrentUserReplied({ id }) {
    return apiHelper.get(`/users/${id}/replied_tweets`)
  },
  getCurrentUserLikes({ id }) {
    return apiHelper.get(`/users/${id}/likes`)
  },
  getCurrentUserFollowers({id}) {
    return apiHelper.get(`/users/${id}/followers`)
  },
  getCurrentUserFollowing({id}) {
    return apiHelper.get(`/users/${id}/followings`)
  },
  signUp ({ account, name, email, password, checkPassword }) {
    return apiHelper.post('/users', { account, name, email, password, checkPassword })
  },
  getUser({ userId }) {
    return apiHelper.get(`/users/${userId}`)
  }
}
