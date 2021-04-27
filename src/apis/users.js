import { apiHelper } from '../utils/helpers'

export default {
  getCurrentUser() {
    return apiHelper.get('/users/currentUser')
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
  getUser({ userId }) {
    return apiHelper.get(`/users/${userId}`)
  },
  getTopUsers() {
    return apiHelper.get('/users/top')
  },
  signUp ({ account, name, email, password, checkPassword }) {
    return apiHelper.post('/users', { account, name, email, password, checkPassword })
  },
  editAccount( userId, { account, name, email, password, checkPassword }) {
    return apiHelper.put(`users/${userId}`, { account, name, email, password, checkPassword })
  },
  addLike({ id }) {
    return apiHelper.post(`/tweets/${id}/like`)
  },
  removeLike({ id }) {
    return apiHelper.post(`/tweets/${id}/unlike`)
  }
}
