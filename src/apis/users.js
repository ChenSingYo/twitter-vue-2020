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
  getCurrentUser({ id }) {
    return apiHelper.get(`/api/users/${id}`)
  },
  getCurrentUserTweets({ id }) {
    return apiHelper.get(`/api/users/${id}/tweets`)
  },
  getCurrentUserReplied({ id }) {
    return apiHelper.get(`/api/users/${id}/replied_tweets`)
  },
  getCurrentUserLikes({ id }) {
    return apiHelper.get(`/api/users/${id}/likes`)
  },
  getCurrentUserFollowers({id}) {
    return apiHelper.get(`/api/users/${id}/followers`)
  },
  getCurrentUserFollowing({id}) {
    return apiHelper.get(`/api/users/${id}/followings`)
  }
}
