<template>
  <div class="tweets">
    <header ref="header"><h4>首頁</h4></header>
    <section ref="post" class="post">
      <div class="post-container">
        <div class="avatar-wrapper">
          <img v-if="currentUser.avatar" class="avatar" :src="currentUser.avatar" />
        </div>
        <textarea
          v-model="description"
          class="tweet-input-box"
          cols="20"
          rows="4"
          maxlength="140"
          placeholder="有什麼新鮮事？"
        ></textarea>
        <div class="btn-wrapper">
          <button class="btn post-btn" @click.stop.prevent="createPostHandle">
            推文
          </button>
        </div>
      </div>
    </section>
    <section
      class="tweet-cell"
      :style="{ 'padding-bottom': postContainerHeight + 'px' }"
    >
      <TweetMessageCell
        v-for="tweet in tweets"
        :key="tweet.id"
        :tweet="tweet"
        @after-reply-message="afterReplyHandle"
        @after-show-article="afterShowArticleHandle"
        @after-like-toggle="afterLikeToggleHandle"
      />
    </section>

    <section>
      <ReplyTweetPopup
        :show-popup-view="showReplyPopup"
        @after-close="handleClose"
      />
    </section>
  </div>
</template>

<script>
import TweetMessageCell from '../components/TweetMessageCell'
import ReplyTweetPopup from '../components/ReplyTweetPopup'
import tweetsAPI from '../apis/tweets'
import { Toast } from '../utils/helpers'

export default {
  name: 'TweetsList',
  props: {
    currentUser: {
      id: -1,
      account: '',
      name: '',
      avatar: '',
      cover: '',
      introduction: ''
    }
  },
  components: {
    TweetMessageCell,
    ReplyTweetPopup
  },
  data() {
    return {
      isMounted: false,
      showReplyPopup: false,
      tweets: [],
      description: ''
    }
  },
  computed: {
    postContainerHeight() {
      if (!this.isMounted) return '0px'
      const headerHeight = this.$refs.header.offsetHeight
      const postHeight = this.$refs.post.offsetHeight
      return headerHeight + postHeight
    }
  },
  created() {
    this.fetchTweets()
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    afterReplyHandle() {
      this.showReplyPopup = true
    },
    handleClose() {
      this.showReplyPopup = false
    },
    afterShowArticleHandle({ id }) {
      this.$router.push(`/tweets/${id}`)
    },
    afterLikeToggleHandle() {
      console.log('點擊喜歡')
    },
    createPostHandle() {
      if (this.description.trim().length < 1) {
        Toast.fire({
          icon: 'warning',
          title: '請輸入推文'
        })
        return
      }
      this.createTweet({ description: this.description })
    },
    async fetchTweets() {
      try {
        const { data } = await tweetsAPI.getTweets()
        this.tweets = data
        // console.log('tweets : ', this.tweets)
      } catch (error) {
        console.log(error)
      }
    },
    async createTweet({ description }) {
      try {
        const { data } = await tweetsAPI.createTweet({ description })

        if (data.status === 'success') {
          Toast.fire({
            icon: 'success',
            title: '新增推文成功'
          })
          return
        }
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '新增推文失敗'
        })
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tweets {
  overflow: hidden;
  width: 600px;

  header {
    border-bottom: 1px solid var(--light-gary-clr);
    h4 {
      margin: 0;
      padding: 1rem;
      font-weight: 700;
      font-size: 1.25rem;
    }
  }

  .post {
    border-bottom: 10px solid var(--light-gary-clr);
  }

  .avatar-wrapper {
    float: left;
    margin: 10px 10px 10px 15px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: var(--light-gary-clr);

    img {
      width: 100%;
      height: 100%;
    }
    
  }

  .tweet-input-box {
    margin-top: 10px;
    width: calc(100% - 75px);
    border: none;
    resize: none;

    &:focus {
      outline: none;
      border: 0;
    }
  }

  .btn-wrapper {
    margin-bottom: 10px;
    text-align: right;
    .post-btn {
      margin-right: 15px;
      padding: 11px 14px;
      height: 40px;
      border-radius: 20px;
      background-color: var(--primary-clr);
      color: #fff;
      line-height: 1;
    }
  }

  .tweet-cell {
    overflow-y: scroll;
    height: 100%;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
