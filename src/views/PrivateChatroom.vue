<template>
  <div class="private-room">
    <NavSidebar />

    <UserMessageListChatRoom
      :users="userList"
      @after-selected-user="afterSelectedUserHandle"
    />

    <ChatRoom
      :inital-connecting-user="connectingUser"
      :inital-messages="messages"
      :current-user="currentUser"
      :is-show-chatroom="isShowChatroom"
      @after-send-message="afterSendMessageHandle"
      @after-leave-room="afterLeaveRoomHandle"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import NavSidebar from '../components/NavSidebar'
import UserMessageListChatRoom from '../components/UserMessageListChatRoom'
import ChatRoom from '../components/ChatRoom'

export default {
  name: 'PrivateChatroom',
  components: {
    NavSidebar,
    UserMessageListChatRoom,
    ChatRoom
  },
  data() {
    return {
      userList: [],
      messages: [],
      connectingUser: {},
      isShowChatroom: false
    }
  },
  computed: {
    ...mapState(['currentUser', 'storeConnectingUser'])
  },
  created() {
    this.disconnectSever()
    this.connectSever()

    if (
      this.storeConnectingUser.length ||
      this.storeConnectingUser.UserId !== -1
    ) {
      this.$socket.emit('privateUser', this.storeConnectingUser.UserId)
      this.connectingUser = this.storeConnectingUser
      this.isShowChatroom = true
      console.log('create : ', this.storeConnectingUser)
    }
  },
  destroyed() {
    this.$store.commit('setConnectingUser', {
      UserId: -1,
      username: '',
      account: '',
      avatar: ''
    })
  },
  sockets: {
    connect() {
      console.log('socket connected')
    },
    userInfo(event) {
      // console.log('user info: ', event)
    },
    privateHistoryMsg(event) {
      console.log('privateHistoryMsg', event)
      this.messages.push(...event)
    },
    privateChatMsg(event) {
      console.log('privateChatMsg: ', event)
      this.messages.push(event)
    },
    findUser(event) {
      // console.log('find user: ', event)
    },
    historyMsgForOneUser(users) {
      console.log('historyMsgForOneUser: ', users)
      this.userList = users
    },
    unreadMsg(data) {
      console.log('unreadMsg: ', data)
    }
  },
  methods: {
    disconnectSever() {
      this.$socket.disconnect()
    },
    connectSever() {
      this.$socket.connect()
    },
    afterSendMessageHandle(message) {
      // console.log(message)
      this.$socket.emit('userMsg', message)
    },
    afterSelectedUserHandle(user) {
      // 跟選擇到的使用者建立 Channel
      // this.messages = []

      this.$socket.emit('privateUser', user.UserId)
      this.connectingUser = user
      // console.log(user.name)
      // this.$socket.emit('privateUser', 'user2')
      this.isShowChatroom = true
    },
    afterLeaveRoomHandle() {
      this.isShowChatroom = false
    }
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
