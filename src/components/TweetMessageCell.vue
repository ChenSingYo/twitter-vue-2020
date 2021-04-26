<template>
  <div class="cell">
    <div class="cell-container" @click.stop.prevent="showArticleHandle">
      <div v-if="tweet.user && tweet.user.avatar" class="avatar-wrapper">
        <img class="avatar" :src="tweet.user.avatar" />
      </div>
      <div class="info-container">
        <span class="name">{{ tweet.user.name || '使用者' }}</span>
        <span class="tag">{{ tweet.user.account || '@account' }}</span>
        <span class="time">{{ formatTime }}</span>
        <p class="content">
          {{ tweet.description }}
        </p>
        <div class="social-container">
          <div class="message" @click="replyHandle">
            <unicon
              name="comment"
              fill="#657786"
              width="15px"
              height="15px"
            ></unicon>
            <span>{{ tweet.repliedCount }}</span>
          </div>
          <div class="favorite" @click="likeHandle">
            <unicon
              name="heart-alt"
              fill="#657786"
              width="15px"
              height="15px"
            ></unicon>
            <span> {{ tweet.likedCount }} </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'TweetMessageCell',
  props: {
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
      }
    }
  },
  computed: {
    formatTime() {
      moment.locale('zh-TW')
      const today = moment.utc(this.tweet.createdAt).isSame(new Date(), 'day')
      const date = moment.utc(this.tweet.createdAt)
      return today
        ? date.format('HH 小時').replace(/^0+/, '')
        : date.format('MM月DD日').replace(/^0+/, '')
    }
  },
  methods: {
    replyHandle() {
      this.$emit('after-reply-message')
    },
    showArticleHandle() {
      this.$emit('after-show-article', { id: this.tweet.id })
    },
    likeHandle() {
      this.$emit('after-like-toggle')
    }
  }
}
</script>

<style lang="scss" scoped>
.cell-container {
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid var(--light-gary-clr);
  cursor: pointer;


.avatar-wrapper {
    margin: 10px 10px 10px 15px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
      background-color: var(--light-gary-clr);

  .avatar {
    width: 100%;
    height: 100%;
  }
}

  .name {
    color: var(--black-clr);
    font-weight: 700;
    font-size: 0.937rem;
  }

  .tag,
  .time {
    margin-left: 5px;
    color: var(--cement-gary-clr);
    font-weight: bold;
    font-size: 0.937rem;
  }

  .time {
    &::before {
      display: inline-block;
      content: '・';
    }
  }

  .content {
    margin-bottom: 10px;
    letter-spacing: 0.6px;
    font-weight: 500;
    font-size: 0.937rem;
    line-height: 22px;
  }

  .social-container {
    display: flex;

    .message,
    .favorite {
      cursor: pointer;
    }

    .message span,
    .favorite span {
      margin-left: 10px;
      color: var(--cement-gary-clr);
      font-weight: 500;
      font-size: 0.812rem;
    }

    .favorite {
      margin-left: 50px;
    }

    img {
      margin-right: 10px;
      width: 15px;
      height: 15px;
    }
  }
}
</style>
