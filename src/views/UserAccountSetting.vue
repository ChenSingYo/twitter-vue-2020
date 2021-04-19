<template>
  <div class="setting-container">
    <NavSidebar />

    設定頁面
  </div>
</template>

<script>
  import NavSidebar from '../components/NavSidebar'

  export default {
    name: 'UserAccountSetting',
    components: {
      NavSidebar,
    },
  }
</script>

<style lang="scss" scoped>
  .setting-container {
    display: flex;
    flex-direction: row;
    height: 100%;
  }
</style>
