import { apiHelper } from '../utils/helpers'

export default {
  addFollowing({ id }) {
    return apiHelper.post('/followships/', { id })
  },
  removeFollowing({ id }) {
    return apiHelper.delete(`/followships/${id}`)
  }
}
