<template>
  <div class="wrapper">
    <AdminSidebar class="admin-sidebar" />
    <div class="center-column">
      <Spinner v-if="isLoading" />
      <template v-else>
        <div class="header">
          <div class="header-title">推文清單</div>
        </div>
        <div class="tweet-list">
          <AminTweetList
            v-for="tweet in tweets"
            :key="tweet.id"
            :initial-tweet="tweet"
            @after-delete-tweet="handleDeleteTweet"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import AdminSidebar from "./../components/AdminSidebar";
import AminTweetList from "./../components/AdminTweetList";
import adminAPI from "./../apis/admin";
import { Toast } from "./../utils/helpers";
import Spinner from "./../components/Spinner";

export default {
  name: 'AdminTweets',
  components: {
    AdminSidebar,
    AminTweetList,
    Spinner
  },
  data() {
    return {
      tweets: [],
      isLoading: true
    };
  },
  created () {
    this.fetchTweets ()
  },
  methods: {
    async fetchTweets () {
      try {
        const { data } = await adminAPI.getTweets()
        if (data.status === 'error') {
          throw new Error(data.status)
        }
        this.tweets = data
        this.isLoading = false
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: `無法取得推文: ${err.message}`
        })
        this.isLoading = false
      }
    },
    handleDeleteTweet (tweetId) {
      this.tweets = this.tweets.filter(tweet => tweet.id !== tweetId)
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: grid;
  width: 100vw;
  grid-template-columns: 26.2% 1fr;
  grid-template-rows: 100vh;

  .admin-sidebar {
    position: fixed;
    z-index: 1;
    grid-column: 1 / 3;
    grid-row: 1 / 2;
    width: 26.2%;
    height: 100vh;
  }

  .center-column {
    grid-column: 2 / 3;
    grid-row: 1 / 1;
  }

  .header {
    position: fixed;
    z-index: 1;
    width: 100vw;
    height: 55px;
    background: #fff;
    border-bottom: 1px solid #e6ecf0;

    .header-title {
      margin-left: 20px;
      line-height: 55px;
      font-weight: 700;
      font-size: 18px;
      color: #1c1c1c;
    }
  }

  .tweet-list {
    margin-top: 70px;
  }
}

/* for mobile */
@media screen and (max-width: 768px) {
  .wrapper {
    display: grid;
    width: 100vw;
    grid-template-columns: 100%;
    grid-template-rows: 50px 1fr;

    .admin-sidebar {
      grid-column: 1 / 1;
      grid-row: 1 / 2;
      width: 100%;
      height: 60px;
    }

    .center-column {
      grid-column: 1 / 1;
      grid-row: 2 / 3;
    }
  }
}
</style>
