
<template>
  <div class="main">
    <div class="column-left column">
      <AdminSidebar />
    </div>
    <div class="column-main column">
      <div class="card main-content">
        <ul class="list-group list-group-flush">
          <p class="loading" v-if="isLoading">Loading...</p>
          <AdminTweetList />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import AdminSidebar from '../components/AdminSidebar'
import AdminTweetList from '../components/AdminTweetList'

export default {
  name: 'AdminTweets',
  components: {
    AdminSidebar,
    AdminTweetList
  },
  data () {
    return {
      isLoading: false
    }
  }
}
</script>
