<template>
  <div class="tweets">
    <header ref="header"><h4>首頁</h4></header>
    <section ref="post" class="post">
      <div class="post-container">
        <div class="avatar-wrapper">
          <img
            v-if="currentUser.avatar"
            class="avatar"
            :src="currentUser.avatar"
          />
        </div>
        <div class="input-wrapper">
          <textarea
            v-model="description"
            class="tweet-input-box"
            cols="20"
            rows="4"
            maxlength="140"
            placeholder="有什麼新鮮事？"
            @keyup="descMaxLengthHandle"
            id="tweet-input"
          ></textarea>
          <span v-if="isOverMaxLength" class="alert-text">字數超出140範圍</span>
        </div>
        <div class="btn-wrapper">
          <button class="btn post-btn" @click.stop.prevent="createPostHandle">
            推文
          </button>
        </div>
      </div>
    </section>

    <Spinner v-if="isLoading" />
    <section
      v-else
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
        @after-to-profile="afterToProfileHandle"
      />
    </section>

    <section>
      <ReplyTweetPopup
        :show-popup-view="showReplyPopup"
        :tweet="replyTweet"
        :current-user="currentUser"
        @after-close="handleClose"
        @after-update-replies="afterUpdateReplies"
      />
    </section>
  </div>
</template>

<script>
import TweetMessageCell from '../components/TweetMessageCell'
import ReplyTweetPopup from '../components/ReplyTweetPopup'
import Spinner from '../components/Spinner'
import tweetsAPI from '../apis/tweets'
import usersAPI from '../apis/users'
import { Toast } from '../utils/helpers'
import { mapState } from 'vuex'

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
    ReplyTweetPopup,
    Spinner
  },
  data() {
    return {
      isMounted: false,
      showReplyPopup: false,
      tweets: [],
      description: '',
      isOverMaxLength: false,
      isLoading: false,
      replyTweet: {
        id: -1,
        UserId: -1,
        description: '',
        createdAt: '',
        updatedAt: '',
        likedCount: -1,
        repliedCount: -1,
        isLiked: false,
        user: {
          avatar: '',
          name: '',
          account: ''
        }
      }
    }
  },
  computed: {
    ...mapState(['isReloadPost']),
    postContainerHeight() {
      if (!this.isMounted) return '0px'
      const headerHeight = this.$refs.header.offsetHeight
      const postHeight = this.$refs.post.offsetHeight
      return headerHeight + postHeight
    }
  },
  watch: {
    isReloadPost(newValue) {
      if (newValue) {
        this.fetchTweets()
      }
    }
  },
  created() {
    this.fetchTweets()
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    afterReplyHandle({ tweet }) {
      this.replyTweet = tweet
      this.showReplyPopup = true
    },
    handleClose() {
      this.showReplyPopup = false
    },
    afterShowArticleHandle({ id }) {
      this.$router.push(`/tweets/${id}`)
    },
    afterLikeToggleHandle({ id, isLiked }) {
      if (isLiked) {
        this.removeLike({ id })
      } else {
        this.addLike({ id })
      }
    },
    afterToProfileHandle({ userId }) {
      this.$router.push({ path: `/profile/${userId}` })
    },
    descMaxLengthHandle() {
      if (this.description.length > 139) {
        this.isOverMaxLength = true
      } else {
        this.isOverMaxLength = false
      }
    },
    // 回覆單一推文 更新資料畫面
    afterUpdateReplies() {
      this.fetchTweets()
      this.showReplyPopup = false
    },
    createPostHandle() {
      if (this.description.trim().length < 1) {
        Toast.fire({
          icon: 'warning',
          title: '請輸入推文'
        })
        return
      }
      const success = this.createTweet({ description: this.description })

      if (success) {
        this.fetchTweets()
      }
    },
    async fetchTweets() {
      this.isLoading = true
      try {
        const { data } = await tweetsAPI.getTweets()
        this.tweets = data
        // console.log('tweets : ', this.tweets)
        this.isLoading = false
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '取得推文失敗，請稍後再試'
        })
        this.isLoading = false
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
          return true
        }
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '新增推文失敗'
        })
        console.log(error)
        return false
      }
    },
    preHandleLike({ id }, isAdd) {
      this.tweets = this.tweets.map(tweet => {
        if (tweet.id === id) {
          return {
            ...tweet,
            isLiked: !!isAdd,
            likedCount: isAdd
              ? (tweet.likedCount += 1)
              : (tweet.likedCount -= 1)
          }
        } else {
          return tweet
        }
      })
    },
    async addLike({ id }) {
      try {
        this.preHandleLike({ id }, true)
        const { data } = await usersAPI.addLike({ id })
        console.log(data)
        if (data.status !== 'success') {
          this.preHandleLike({ id }, false)
        }
      } catch (error) {
        console.log(error)
        this.preHandleLike({ id }, false)
        Toast.fire({
          icon: 'error',
          title: '加入喜歡推文失敗，請稍後再試'
        })
      }
    },
    async removeLike({ id }) {
      try {
        this.preHandleLike({ id }, false)
        const { data } = await usersAPI.removeLike({ id })
        if (data.status !== 'success') {
          this.preHandleLike({ id }, true)
        }
        console.log(data)
      } catch (error) {
        console.log(error)
        this.preHandleLike({ id }, true)
        Toast.fire({
          icon: 'error',
          title: '移除喜歡推文失敗，請稍後再試'
        })
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
    overflow: hidden;
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

  .input-wrapper {
    position: relative;
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

    .alert-text {
      position: absolute;
      top: 100%;
      left: 75px;
      z-index: 20;
      display: inline-block;
      padding: 8px 16px;
      border-radius: 8px;
      background-color: var(--light-gary-clr);
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
      color: var(--cement-gary-clr);
      font-size: 14px;
      &::before {
        position: absolute;
        top: -16px;
        left: 5;
        display: block;
        width: 0;
        height: 0;
        border-width: 8px;
        border-style: solid solid solid solid;
        border-color: transparent transparent var(--light-gary-clr) transparent;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        content: '';
      }
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
