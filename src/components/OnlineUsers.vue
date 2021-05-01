<template>
  <div class="user-container">
    <router-link :to="{ name: 'other-profile', params: { id: onlineUser.id } }">
      <img :src="onlineUser.avatar" />
    </router-link>
    <router-link :to="{ name: 'other-profile', params: { id: onlineUser.id } }">
      <span class="user-name">{{ onlineUser.name }}</span>
    </router-link>
    <router-link :to="{ name: 'other-profile', params: { id: onlineUser.id } }">
      <span class="user-account">@{{ onlineUser.account }}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'OnlineUsers',
  props: {
    onlineUser: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.user-container {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 15px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    vertical-align: middle;
    object-fit: cover;
  }
  .user-name {
    color: var(--black-clr);
    font-weight: 500;
    margin-left: 10px;
  }
  .user-account {
    color: var(--cement-gary-clr);
    margin-left: 7px;
  }
}
</style>
