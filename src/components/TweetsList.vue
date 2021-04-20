<template>
  <div class="tweets">
    <header><h4>首頁</h4></header>
    <section class="post">
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

    <TweetMessageCell />
  </div>
</template>

<script>
import TweetMessageCell from '../components/TweetMessageCell'

export default {
  name: 'TweetsList',
  components: {
    TweetMessageCell
  }
}
</script>

<style lang="scss" scoped>
.tweets {
  flex-grow: 1;
  min-width: 600px;

  header {
    border-bottom: 1px solid var(--light-gary-clr);
    h4 {
      margin: 0;
      padding: 1rem;
      font-weight: 700;
      font-size: 1.25;
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
}
</style>
