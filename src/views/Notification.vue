<template>
  <div class="wrapper">
    <NavSideBar class="side-bar" />
    <div class="center-column">
      <div class="header">
        <div class="header-title">通知</div>
      </div>
      <div class="notification-wrapper">
        <img class="avatar" src="" alt="img" />
        <div class="title-wrapper">
          <div class="title">
           有新的推文通知
          </div>
          <div class="title">
           有新的回覆
          </div>
          <div  class="title">
             開始追蹤你
          </div>
          <div  class="title">
            你的貼文有新的回覆
          </div>
          <div  class="title">
             喜歡你的貼文
          </div>
        </div>
        <div class="content">test123</div>
      </div>
    </div>

    <!-- Recommendation -->
    <RecommendSidebar class="recommendation-list" />
  </div>
</template>

<script>
import NavSideBar from './../components/NavSidebar'
import RecommendSidebar from '../components/RecommendSidebar'
const dummyNotifications = [
  {
    id: 1,
    avatar: 'https://loremflickr.com/320/240/dog/?lock=2.0202522757629793',
    name: 'John',
    title: 'newTweet',
    content:
      'Vero ut dolor rerum ad. Consectetur assumenda voluptatem cumque hic rerum repellat quae fugit. Et eos ut vel perferendis. Nobis rerum eos.'
  },
  {
    id: 2,
    avatar: 'https://loremflickr.com/320/240/dog/?lock=42.87898512441826',
    name: 'Mary',
    title: 'newReply',
    content:
      'Vero ut dolor rerum ad. Consectetur assumenda voluptatem cumque hic rerum repellat quae fugit. Et eos ut vel perferendis. Nobis rerum eos.'
  },
  {
    id: 3,
    avatar: 'https://loremflickr.com/320/240/dog/?lock=7.643201110272924',
    name: 'Michael',
    title: 'newFollow',
    content: ''
  },
  {
    id: 4,
    avatar: 'https://loremflickr.com/320/240/dog/?lock=4.951409888063251',
    name: '',
    title: 'newReplySelf',
    content:
      'Vero ut dolor rerum ad. Consectetur assumenda voluptatem cumque hic rerum repellat quae fugit. Et eos ut vel perferendis. Nobis rerum eos.'
  },
  {
    id: 5,
    avatar: 'https://loremflickr.com/320/240/dog/?lock=46.034589452628985',
    name: 'Peter',
    title: 'newLike',
    content: ''
  }
]
export default {
  name: 'Notifications',
  components: {
    NavSideBar,
    RecommendSidebar
  },
  data() {
    return {
      notifications: []
    }
  },
  created() {
    this.fetchNotifications()
  },
  mounted() {
    this.handleTitle()
  },
  methods: {
    fetchNotifications() {
      this.notifications = dummyNotifications
    },
    afterPostTweet() {
      this.fetchTweets()
    },
    handleTitle() {
    }
  }
}
</script>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: 378px 600px 462px;
  grid-template-rows: 100vh;
}
.side-bar {
  position: fixed;
  z-index: 2;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  padding-left: 103px;
  width: 378px;
  height: 100vh;
  border-right: 1px solid #e6ecf0;
}
.center-column {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  border-right: 1px solid #e6ecf0;
}
.recommendation-list {
  position: fixed;
  top: 15px;
  left: 1008px;
  grid-column: 3 / 4;
  grid-row: 1 / 2;
}
.header {
  position: fixed;
  z-index: 1;
  width: 600px;
  height: 55px;
  border-right: 1px solid #e6ecf0;
  border-bottom: 1px solid #e6ecf0;
  background: #fff;
}
.header-title {
  margin-left: 15px;
  line-height: 55px;
  font-weight: 700;
  font-size: 18px;
  color: #1c1c1c;
}
.notification-wrapper {
  margin-top: 55px;
}
.notification-list {
  border-bottom: 1px solid #e6ecf0;
}
.notification-wrapper {
  padding: 15px 15px 10px 15px;
}
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.title-wrapper {
  margin-top: 10px;
}
.title {
  font-weight: 500;
  font-size: 15px;
}
.content {
  margin-top: 5px;
  font-weight: 500;
  font-size: 15px;
  color: #657786;
}
</style>
