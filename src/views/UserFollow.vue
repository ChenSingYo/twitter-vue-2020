<template>
  <div class="follow-container">
    <!-- 左側 bar -->
    <NavSidebar />

    <!-- 使用者跟隨者、正在跟隨 -->
    <UserFollowPanels :current-user="currentUser" />

    <!-- 右側 bar -->
    <RecommendSidebar />
  </div>
</template>

<script>
import NavSidebar from '../components/NavSidebar'
import RecommendSidebar from '../components/RecommendSidebar'
import UserFollowPanels from '../components/UserFollowPanels'
import { mapState } from 'vuex'

export default {
  name: 'UserFollow',
  components: {
    NavSidebar,
    RecommendSidebar,
    UserFollowPanels
  },
  computed: {
    ...mapState(['currentUser'])
  }
}
</script>

<style lang="scss" scoped>
.follow-container {
  display: flex;
  flex-direction: row;
  height: 100%;
}
</style>
