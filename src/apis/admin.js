import { apiHelper } from '../utils/helpers'

export default {
  getTweets () {
    return apiHelper.get('/tweets')
  },
  deleteTweet ({ tweetId }) {
    return apiHelper.delete(`/admin/tweets/${tweetId}`)
  },
  getUsers () {
    return apiHelper.get('/admin/users')
  }
}
