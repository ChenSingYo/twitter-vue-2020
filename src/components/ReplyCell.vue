<template>
  <div class="cell">
    <div class="cell-container" @click="replyHandle">
      <img class="avatar" :src="reply.User.avatar" />
      <div class="info-container">
        <div class="message-wrapper">
          <span class="name">{{ reply.User.name }}</span>
          <span class="tag">{{ reply.User.account }}・{{ hour }}</span>
        </div>
        <div class="reply-wrapper">
          <span class="reply-text">回覆</span>
          <span class="reply-tag">{{ user.account }}</span>
        </div>
        <p class="content">
          {{ reply.comment }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'ReplyCell',
  props: {
    reply: {
      id: -1,
      tweetId: -1,
      comment: '',
      updatedAt: '',
      User: {
        id: -1,
        avatar: '',
        name: '',
        account: ''
      }
    },
    user: {
      id: -1,
      avatar: '',
      name: '',
      account: ''
    }
  },
  computed: {
    hour() {
      if (!this.reply.updatedAt) return ''
      moment.locale('zh_TW')
      return moment(this.reply.updatedAt).fromNow()
    }
  },
  methods: {
    replyHandle() {}
  }
}
</script>

<style lang="scss" scoped>
.cell-container {
  position: relative;
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid var(--light-gary-clr);

  .avatar {
    margin: 10px 10px 10px 15px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
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

  .reply-text {
    margin-right: 5px;
    color: var(--cement-gary-clr);
    font-weight: 500;
    font-size: 0.937rem;
  }

  .reply-tag {
    color: var(--primary-clr);
    font-weight: 500;
    font-size: 0.937rem;
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
</style>
