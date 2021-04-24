<template>
  <div class="setting-container">
    <NavSidebar />

    <UserSettingForm />
  </div>
</template>

<script>
import NavSidebar from '../components/NavSidebar'
import UserSettingForm from '../components/UserSettingForm'

export default {
  name: 'UserAccountSetting',
  components: {
    NavSidebar,
    UserSettingForm
  }
}
</script>

<style lang="scss" scoped>
.setting-container {
  display: flex;
  flex-direction: row;
  height: 100%;
}
</style>
