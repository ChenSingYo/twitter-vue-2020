<template>
  <div class="wrapper">
    <AdminSidebar class="admin-sidebar" />
    <div class="center-column">
      <div class="header">
        <div class="header-title">推文清單</div>
      </div>
      <div class="tweet-list">
        <AminTweetList/>
        <AminTweetList/>
        <AminTweetList/>
        <AminTweetList/>
        <AminTweetList/>
        <AminTweetList/>
        <AminTweetList/>
        <AminTweetList/>
        <AminTweetList/>
        <AminTweetList/>
        <AminTweetList/>
        <AminTweetList/>
      </div>
    </div>
  </div>
</template>

<script>
import AdminSidebar from './../components/AdminSidebar'
import AminTweetList from './../components/AdminTweetList'

export default {
  name: 'AdminTweets',
  components: {
    AdminSidebar,
    AminTweetList
  },
  data () {
    return {
      tweets: []
    }
  }
}
</script>

<style lang="scss" scoped>

.wrapper {
  display: grid;
  width: 100vw;
  grid-template-columns: 26.2% 1fr;
  grid-template-rows: 100vh;

  .admin-sidebar {
    position: fixed;
    z-index: 1;
    grid-column: 1 / 1;
    grid-row: 1 / 2;
    width: 26.2%;
    height: 100vh;
  }

  .center-column {
    grid-column: 2 / 3;
    grid-row: 1 / 2 ;
    border-left: 1px solid #e6ecf0;
  }

  .header {
    position: fixed;
    z-index: 1;
    width: 100vw;
    height: 55px;
    background: #fff;
    border-bottom: 1px solid #e6ecf0;

    .header-title {
      margin-left: 20px;
      line-height: 55px;
      font-weight: 700;
      font-size: 18px;
      color: #1c1c1c;
    }
  }

  .tweet-list {
    margin-top: 70px;
  }
}
</style>
