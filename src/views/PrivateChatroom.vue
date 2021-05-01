<template>
  <div class="private-room">
    <NavSidebar />

    <UserMessageListChatRoom />

    <ChatRoom />
  </div>
</template>

<script>
import NavSidebar from '../components/NavSidebar'
import UserMessageListChatRoom from '../components/UserMessageListChatRoom'
import ChatRoom from '../components/ChatRoom'

export default {
  name: 'PrivateChatroom',
  components: {
    NavSidebar,
    UserMessageListChatRoom,
    ChatRoom
  }
}
</script>

<style lang="scss" scoped>
.private-room {
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100%;
}
</style>
