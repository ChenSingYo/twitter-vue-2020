<template>
  <div class="tweets">
    <header ref="header"><h4>首頁</h4></header>
    <section ref="post" class="post">
      <div class="post-container">
        <img class="avatar" src="https://picsum.photos/50" />
        <textarea
          class="tweet-input-box"
          name="tweet"
          id=""
          cols="20"
          rows="4"
          placeholder="有什麼新鮮事？"
        ></textarea>
        <div class="btn-wrapper">
          <button class="btn post-btn">推文</button>
        </div>
      </div>
    </section>
    <section
      class="tweet-cell"
      :style="{ 'padding-bottom': postContainerHeight + 'px' }"
    >
      <TweetMessageCell
        v-for="index in 10"
        :key="index"
        @after-reply-message="afterReplyHandle"
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

export default {
  name: 'TweetsList',
  components: {
    TweetMessageCell,
    ReplyTweetPopup
  },
  data() {
    return {
      isMounted: false,
      showReplyPopup: false
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
  mounted() {
    this.isMounted = true
  },
  methods: {
    afterReplyHandle() {
      this.showReplyPopup = true
    },
    handleClose() {
      this.showReplyPopup = false
    }
  }
}
</script>

<style lang="scss" scoped>
.tweets {
  overflow: hidden;

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

  .avatar {
    float: left;
    margin: 10px 10px 10px 15px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
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
