import { apiHelper } from '../utils/helpers'

export default {
  getTweets() {
    return apiHelper.get('/tweets/')
  },
  createTweet({ description }) {
    return apiHelper.post('/tweets/', { description })
  },
  getTweet({ id }) {
    return apiHelper.get(`/tweets/${id}`)
  },
  getTweetReplies({ id }) {
    return apiHelper.get(`/tweets/${id}/replies`)
  },
  createTweetReply({ id, comment }) {
    return apiHelper.post(`/tweets/${id}/replies`, { comment })
  }
}
