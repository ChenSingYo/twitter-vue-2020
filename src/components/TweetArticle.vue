<template>
  <div class="tweet">
    <div class="tweet-container">
      <Header title="推文" :enable-back-btn="true" />

      <section ref="tweetBoard" class="tweet-board">
        <div class="borad-container">
          <div class="user-info">
            <img class="avatar" src="https://picsum.photos/50" />
            <div class="name">Name</div>
            <div class="tag">@Tag</div>
          </div>
          <div class="info-container">
            <p class="content">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
              mollitia aliquid voluptas corporis voluptatibus exercitationem!
              Consequatur dolor repellat, reprehenderit minus beatae
              perspiciatis possimus sapiente architecto accusantium voluptate
              asperiores ab ex?
            </p>
            <div class="time-wrapper">
              <span>time</span>
              <span>date</span>
            </div>
          </div>
          <div class="count-container">
            <div class="reply-wrapper">
              <span class="count">34</span>
              <span class="text"> 回覆</span>
            </div>
            <div class="like-wrapper">
              <span class="count">808</span>
              <span class="text"> 喜歡次數</span>
            </div>
          </div>
          <div class="toolbar">
            <unicon
              name="comment"
              fill="#657786"
              width="30px"
              height="30px"
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
        class="reply-cell"
        :style="{ 'padding-bottom': tweetBoardHeight + 'px' }"
      >
        <ReplyCell v-for="index in 10" :key="index" />
      </section>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'
import ReplyCell from '../components/ReplyCell'
export default {
  name: 'TweetArticle',
  components: {
    Header,
    ReplyCell
  },
  data() {
    return {
      isMounted: false
    }
  },
  computed: {
    tweetBoardHeight() {
      if (!this.isMounted) return '0px'
      const boardHeight = this.$refs.tweetBoard.offsetHeight + 55 // 55 為 header 固定高度
      return boardHeight
    }
  },
  mounted() {
    this.isMounted = true
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
