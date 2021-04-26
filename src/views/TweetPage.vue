<template>
  <div class="tweet-container">
    <!-- 左側 bar -->
    <NavSidebar />

    <!-- Tweet 文章詳情 -->
    <TweetArticle />

    <!-- 右側 bar -->
    <RecommendSidebar />
  </div>
</template>

<script>
import NavSidebar from '../components/NavSidebar'
import RecommendSidebar from '../components/RecommendSidebar'
import TweetArticle from '../components/TweetArticle'

export default {
  name: 'TweetPage',
  components: {
    NavSidebar,
    RecommendSidebar,
    TweetArticle
  }
}
</script>

<style lang="scss" scoped>
.tweet-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100%;
}
</style>
