
<template>
  <div class="main">
    <div class="column-left column">
      <AdminNavbar />
    </div>
    <div class="column-main column">
      <div class="card main-content">
        <ul class="list-group list-group-flush">
          <Header />
          <p class="loading" v-if="isLoading">Loading...</p>
          <TweetCard
            v-else
            v-for="tweet in tweets"
            :key="tweet.id"
            :initial-tweet="tweet"
            @after-delete-tweet="handleAfterDeleteTweet"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import AdminSidebar from '../components/AdminSidebar'
export default {
  name: 'AdminTweets',
  component: {
    AdminSidebar
  }
}
</script>
