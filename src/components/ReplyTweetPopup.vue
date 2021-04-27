<template>
  <transition v-if="showPopupView" name="fade">
    <div class="popup">
      <div class="popup-container">
        <div class="post-container">
          <header>
            <button class="btn close-btn" @click="handleClose">
              <unicon name="multiply" fill="#ff6600"></unicon>
            </button>
          </header>

          <section class="tweet">
            <div class="tweet-container">
              <div class="img-wrapper">
                <img class="avatar" src="https://picsum.photos/50" />
              </div>
              <div class="info-container">
                <div class="message-wrapper">
                  <span class="name">{{ tweet.user.name || '使用者' }}</span>
                  <span class="tag">{{ tweet.user.account }}・{{ hour }}</span>
                </div>
                <p class="content">
                  {{ tweet.description }}
                </p>
                <div class="reply-wrapper">
                  <span class="reply-text">回覆給</span>
                  <span class="reply-tag">{{ tweet.user.account }}</span>
                </div>
              </div>
            </div>
          </section>

          <section class="post">
            <div class="post-panel">
              <div class="img-wrapper">
                <!-- current user image -->
                <img class="avatar" src="https://picsum.photos/50" />
              </div>
              <textarea
                v-model="replyText"
                class="tweet-input-box"
                name="tweet-text"
                id=""
                cols="20"
                rows="4"
                placeholder="推你的回覆"
              ></textarea>
              <div class="btn-wrapper">
                <button class="btn post-btn" @click="createReplyHandle">
                  回覆
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import moment from 'moment'
import tweetsAPI from '../apis/tweets'
import { Toast } from '../utils/helpers'

export default {
  name: 'ReplyTweetPopup',
  props: {
    showPopupView: {
      type: Boolean,
      require: true,
      default: false
    },
    tweet: {
      id: -1,
      UserId: -1,
      description: '',
      createdAt: '',
      updatedAt: '',
      user: {
        avatar: '',
        name: '',
        account: ''
      }
    }
  },
  data() {
    return {
      replyText: ''
    }
  },
  watch: {
    showPopupView(value) {
      if (value) {
        this.replyText = ''
      }
    }
  },
  computed: {
    hour() {
      if (!this.tweet.createdAt) return ''
      moment.locale('zh_TW')
      return moment
        .utc(this.tweet.createdAt)
        .format('HH 小時')
        .replace(/^0+/, '')
    }
  },
  methods: {
    handleClose() {
      this.$emit('after-close')
    },
    createReplyHandle() {
      if (this.replyText.trim().length < 1) {
        Toast.fire({
          icon: 'warning',
          title: '請輸入回覆訊息'
        })
        return
      }
      const { id } = this.$route.params
      this.createReply({ id, comment: this.replyText })
    },
    createReply({ id, comment }) {
      try {
        const { status } = tweetsAPI.createTweetReply({ id, comment })

        console.log('create reply: ', status)

        Toast.fire({
          icon: 'success',
          title: '新增成功'
        })

        setTimeout(() => {
          this.$emit('after-close')
        }, 1000)
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '新增回覆錯誤，請稍後再試'
        })
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin img-style {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.popup {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.4);
}

.post-container {
  overflow: hidden;
  margin: 54px auto;
  max-width: 600px;
  width: 600;
  border-radius: 14px;
  background-color: #fff;

  header {
    margin-top: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid var(--light-gary-clr);

    button {
      margin-left: 15px;
      padding: 0;
      width: 24px;
      height: 24px;
      line-height: 0;
    }
  }

  .tweet-container {
    display: flex;
    margin-top: 15px;

    .img-wrapper {
      position: relative;
      margin: 0 10px 0 15px;

      .avatar {
        @include img-style;
      }

      &::after {
        position: absolute;
        top: 50px;
        left: 50%;
        display: block;
        margin-top: 5px;
        width: 2px;
        height: calc(100% - 50px);
        background-color: #ccd6dd;
        content: '';
        transform: translateX(-50%);
      }
    }

    .name {
      margin-right: 5px;
      color: var(--black-clr);
      font-weight: 700;
      font-size: 0.937rem;
    }

    .tag {
      color: var(--cement-gary-clr);
      font-weight: 500;
      font-size: 0.937rem;
    }

    .reply-wrapper {
      margin-top: 15px;
      .reply-text {
        margin-right: 5px;
        color: var(--cement-gary-clr);
        font-weight: 400;
        font-size: 0.8125rem;
      }

      .reply-tag {
        color: var(--primary-clr);
        font-weight: 500;
        font-size: 0.8125rem;
      }
    }

    .content {
      margin-bottom: 0;
      color: var(--black-clr);
      letter-spacing: 0.6px;
      font-weight: 500;
      font-size: 0.937rem;
      line-height: 22px;
    }
  }

  .post-panel {
    margin-top: 10px;

    .img-wrapper {
      position: relative;
      float: left;
      margin-right: 10px;
      margin-left: 15px;

      .avatar {
        @include img-style;
      }

      &::after {
        position: absolute;
        bottom: 100%;
        left: 50%;
        display: block;
        margin-bottom: 5px;
        width: 2px;
        height: calc(100% - 25px);
        background-color: #ccd6dd;
        content: '';
        transform: translateX(-50%);
      }
    }

    .tweet-input-box {
      padding: 11px 15px 0 0;
      width: calc(100% - 75px);
      border: none;
      font-weight: 500;
      font-size: 18px;
      line-height: 26px;
      resize: none;

      &:focus {
        outline: none;
        border: 0;
      }
    }

    .btn-wrapper {
      padding: 15px;
      text-align: right;

      .post-btn {
        padding: 11px 14px;
        height: 40px;
        border-radius: 20px;
        background-color: var(--primary-clr);
        color: #fff;
        line-height: 1;
      }
    }
  }
}

.btn:focus {
  box-shadow: none;
}
</style>
