<template>
  <div class="profile-container">
    <!-- 左側 bar -->
    <NavSidebar />

    <!-- 使用者資訊 -->
    <UserInfo :user-id="userId || currentUser.id" />

    <!-- 右側 bar -->
    <RecommendSidebar />
  </div>
</template>

<script>
import NavSidebar from '../components/NavSidebar'
import UserInfo from '../components/UserInfo'
import RecommendSidebar from '../components/RecommendSidebar'
import { mapState } from 'vuex'

export default {
  name: 'UserProfile',
  components: {
    NavSidebar,
    UserInfo,
    RecommendSidebar
  },
  data() {
    return {
      userId: this.$route.params.id
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  created() {}
}
</script>

<style lang="scss" scoped>
.profile-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100%;
}
</style>
