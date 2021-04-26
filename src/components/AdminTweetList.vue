<template>
  <div class="cell cell-container">
    <img class="avatar" :src="tweet.user.avatar" />
      <p class="loading" v-if="false">Loading...</p>
      <div class="info-container">
        <span class="name">{{tweet.user.name}}</span>
        <span class="tag">@{{tweet.user.account}}</span>
        <span class="time">{{tweet.createdAt | fromNow}}</span>
        <p class="content">
          {{tweet.description | countText}}
        </p>
      </div>
      <button
        type="button"
        class="btn"
        @click.prevent.stop="deleteTweet(tweet.id)"
      >
        <img src="../assets/icon/icon_close.svg" alt="">
      </button>
  </div>
</template>

<script>
import adminAPI from './../apis/admin'
import { Toast } from './../utils/helpers'
import { fromNowFilter, emptyImageFilter, countText } from './../utils/mixins'

export default {
  mixins: [fromNowFilter, emptyImageFilter, countText],
  name: 'AdminTweetList',
  props: {
    initialTweet: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isProcessing: false,
      tweet: this.initialTweet
    }
  },
  watch: {
    initialTweet (newValue) {
      this.tweet = {
        ...this.tweet,
        ...newValue
      }
    }
  },
  methods: {
    async deleteTweet (tweetId) {
      try {
        this.isProcessing = true
        const { data } = await adminAPI.deleteTweet({ tweetId })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        Toast.fire({
          icon: 'success',
          title: `推文已刪除！`
        })

        this.isProcessing = false
        // send event to parent view/component
        this.$emit('after-delete-tweet', this.tweet.id)
      } catch (err) {
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: `無法刪除: ${err.message}`
        })
      }
    }
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
    margin: 3px 15px 10px 15px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
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
    font-weight: medium;
    font-size: 0.937rem;
  }

  .time {
    &::before {
      display: inline-block;
      font-weight: bold;
      content: '・';
    }
  }

  .content {
    text-align:justify;
    margin-bottom: 10px;
    padding-right: 1rem;
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 22px;
  }

  button {
    img {
      position: absolute;
      right: 12px;
      top: 12px;
    }
  }
}
</style>
