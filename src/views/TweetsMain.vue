<template>
  <div class="main-container">
    <!-- 左側 bar -->
    <NavSidebar />

    <!-- 使用者文章列表 -->
    <TweetsList />

    <!-- 右側 bar -->
    <RecommendSidebar />
  </div>
</template>

<script>
import NavSidebar from '../components/NavSidebar'
import TweetsList from '../components/TweetsList'
import RecommendSidebar from '../components/RecommendSidebar'

export default {
  name: 'TweetsMain',
  components: {
    NavSidebar,
    TweetsList,
    RecommendSidebar
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
