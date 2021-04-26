import { apiHelper } from '../utils/helpers'

export default {
  addFollowing({id}) {
    return apiHelper.post('/api/followships/', {id} )
  },
  removeFollowing({id}) {
    return apiHelper.delete(`/api/followships/${id}`)
  }

}