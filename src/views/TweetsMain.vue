<template>
  <div class="main-container">
    <!-- 左側 bar -->
    <NavSidebar />

    <!-- 使用者文章列表 -->
    <TweetsList :current-user="currentUser" />

    <!-- 右側 bar -->
    <RecommendSidebar />
  </div>
</template>

<script>
import NavSidebar from '../components/NavSidebar'
import TweetsList from '../components/TweetsList'
import RecommendSidebar from '../components/RecommendSidebar'
import { mapState } from 'vuex'

export default {
  name: 'TweetsMain',
  components: {
    NavSidebar,
    TweetsList,
    RecommendSidebar
  },
  computed: {
    ...mapState([
      'currentUser',
      'isAuthenticated'
    ])
  },
  created() {
    this.connectSever()
  },
  methods: {
    connectSever() {
      this.$socket.connect()
      this.$socket.emit('outOfRoom')
      console.log('socket status: outOfRoom')
    }
  }
}
</script>

<style lang="scss" scoped>
.main-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100%;
}
</style>
