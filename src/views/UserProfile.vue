<template>
  <div class="profile-container">
    <!-- 左側 bar -->
    <NavSidebar />

    <!-- 使用者資訊 -->
    <UserInfo />

    <!-- 右側 bar -->
    <RecommendSidebar />
  </div>
</template>

<script>
  import NavSidebar from '../components/NavSidebar'
  import UserInfo from '../components/UserInfo'
  import RecommendSidebar from '../components/RecommendSidebar'

  export default {
    name: 'UserProfile',
    components: {
      NavSidebar,
      UserInfo,
      RecommendSidebar,
    },
  }
</script>

<style lang="scss" scoped>
  .profile-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 100%;
  }
</style>
