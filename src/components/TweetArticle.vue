<template>
  <div class="tweet">
    <div class="tweet-container">
      <Header title="推文" :enable-back-btn="true" />
      <section ref="tweetBoard" class="tweet-board">
        <div class="borad-container">
          <div class="user-info">
            <img class="avatar" :src="tweet.user.avatar" />
            <div class="name">{{ tweet.user.name || '使用者' }}</div>
            <div class="tag">{{ tweet.user.account || '@account' }}</div>
          </div>
          <div class="info-container">
            <p class="content">
              {{ tweet.description }}
            </p>
            <div class="time-wrapper">
              <span>{{ time }}</span>
              <span>{{ fullYear }}</span>
            </div>
          </div>
          <div class="count-container">
            <div class="reply-wrapper">
              <span class="count">{{ tweet.repliedCount }}</span>
              <span class="text"> 回覆</span>
            </div>
            <div class="like-wrapper">
              <span class="count">{{ tweet.likedCount }}</span>
              <span class="text"> 喜歡次數</span>
            </div>
          </div>
          <div class="toolbar">
            <unicon
              name="comment"
              fill="#657786"
              width="30px"
              height="30px"
              @click="replyPopupHandle"
            ></unicon>
            <unicon
              name="heart-alt"
              fill="#657786"
              width="30px"
              height="30px"
            ></unicon>
          </div>
        </div>
      </section>

      <section
        v-if="tweet.tweetReplies"
        class="reply-cell"
        :style="{ 'padding-bottom': tweetBoardHeight + 'px' }"
      >
        <ReplyCell
          v-for="reply in tweet.tweetReplies"
          :key="reply.id"
          :reply="reply"
          :user="tweet.user"
        />
      </section>

      <section>
        <ReplyTweetPopup
          :tweet="tweet"
          :show-popup-view="showReplyPopup"
          @after-close="handleClose"
          @after-update-replies="afterUpdateRepliesHandle"
        />
      </section>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'
import ReplyCell from '../components/ReplyCell'
import ReplyTweetPopup from '../components/ReplyTweetPopup'

import tweetsAPI from '../apis/tweets'
import { Toast } from '../utils/helpers'
import moment from 'moment'

export default {
  name: 'TweetArticle',
  components: {
    Header,
    ReplyCell,
    ReplyTweetPopup
  },
  data() {
    return {
      isMounted: false,
      isLoading: false, // TODO: 用在外層時 tweetBoardHeight 高度會抓不到，尚未修正。暫時無用此變數
      showReplyPopup: false,
      tweet: {
        id: -1,
        UserId: -1,
        description: '',
        createdAt: '',
        updatedAt: '',
        likedCount: -1,
        repliedCount: -1,
        user: {
          avatar: '',
          name: '',
          account: ''
        },
        tweetReplies: []
      },
      id: this.$route.params.id
    }
  },
  computed: {
    tweetBoardHeight() {
      if (!this.isMounted) return '0px'
      const boardHeight = this.$refs.tweetBoard.offsetHeight + 55 // 55 為 header 固定高度
      return boardHeight
    },
    time() {
      moment.locale('zh_TW')
      return moment.utc(this.tweet.createdAt).format('A HH:mm')
    },
    fullYear() {
      return moment.utc(this.tweet.createdAt).format('YYYY年MM月DD日')
    }
  },
  mounted() {
    this.isMounted = true
  },
  created() {
    // const { id } = this.$route.params
    this.fetchTweet({ id: this.id })
  },
  methods: {
    replyPopupHandle() {
      this.showReplyPopup = true
    },
    handleClose() {
      this.showReplyPopup = false
    },
    fetchTweet({ id }) {
      try {
        // this.isLoading = true
        const tweetResponse = tweetsAPI.getTweet({ id })
        const tweetRepliesResponse = tweetsAPI.getTweetReplies({ id })

        Promise.all([tweetResponse, tweetRepliesResponse])
          .then(result => {
            const { data: tweetData } = result[0]
            const { data: replies } = result[1]

            this.tweet = tweetData
            this.tweet.tweetReplies = replies
          })
          .catch(error => {
            console.log(error)
          })
          .finally(() => {
            // this.isLoading = false
          })
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '取得推文錯誤'
        })

        // this.isLoading = false
      }
    },
    afterUpdateRepliesHandle() {
      this.afterFetchReplies({ id: this.id })
      this.showReplyPopup = false
    },
    async afterFetchReplies({ id }) {
      try {
        const { data } = await tweetsAPI.getTweetReplies({ id })

        this.tweet.tweetReplies = data
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '取得回覆列表錯誤，請稍後再試'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tweet {
  overflow: hidden;
  width: 600px;
}

.tweet-container {
  height: 100%;
}

.tweet-board {
  border-bottom: 1px solid var(--light-gary-clr);
}

.borad-container {
  padding: 0 15px;

  .user-info {
    padding-top: 15px;

    .avatar {
      display: block;
      float: left;
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }

    .name,
    .tag {
      margin-left: 60px;
      font-size: 0.937rem;
      line-height: 25px;
    }

    .name {
      color: var(--black-clr);
      font-weight: 700;
    }

    .tag {
      color: var(--cement-gary-clr);
      font-weight: bold;
    }
  }

  .info-container {
    .content {
      margin: 15px 0;
      color: var(--black-clr);
      letter-spacing: 0.6px;
      font-weight: 500;
      font-size: 23px;
      line-height: 1.1;
    }

    .time-wrapper {
      span {
        color: var(--cement-gary-clr);
        font-weight: 500;
        font-size: 15px;

        &:first-child::after {
          content: '・';
        }
      }
    }
  }

  .count-container {
    display: flex;
    margin-top: 15px;
    padding: 20px 0;
    border-top: 1px solid var(--light-gary-clr);
    border-bottom: 1px solid var(--light-gary-clr);

    .reply-wrapper {
      margin-right: 20px;
    }

    .count,
    .text {
      font-size: 19px;
    }

    .count {
      color: var(--black-clr);
      font-weight: bold;
    }

    .text {
      color: var(--cement-gary-clr);
      font-weight: 500;
    }
  }

  .toolbar {
    padding: 15px 0 8px;

    .unicon {
      cursor: pointer;
    }

    .unicon:first-child {
      margin-right: 150px;
    }
  }
}

.reply-cell {
  overflow-y: scroll;
  height: 100%;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
