import { apiHelper } from '../utils/helpers'

export default {
  getTweets() {
    return apiHelper.get('/api/tweets/')
  },
  createTweet({ description }) {
    return apiHelper.post('/api/tweets/', { description })
  },
  getTweet({ id }) {
    return apiHelper.get(`/api/tweets/${id}`)
  },
  getTweetReplies({ id }) {
    return apiHelper.get(`/api/tweets/${id}/replies`)
  },
  createTweetReply({ id, comment }) {
    return apiHelper.post(`/api/tweets/${id}/replies`, { comment })
  },
  addLike({ id }) {
    return apiHelper.post(`/api/tweets/${id}/like`)
  },
  removeLike({ id }) {
    return apiHelper.post(`/api/tweets/${id}/unlike`)
  }
}
