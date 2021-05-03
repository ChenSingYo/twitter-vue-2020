<template>
  <div class="chatroom-container">
    <template>
      <!-- 導覽列 -->
      <div class="left-navbar">
        <NavSidebar />
      </div>
      <!-- 上線使用者 -->
      <div class="user-list">
        <div class="title">上線使用者 ({{ onlineCount }})</div>
        <!-- v-for OnlineUsers -->
        <OnlineUsers
          v-for="onlineUser in onlineUsers"
          :key="onlineUser.id"
          :onlineUser="onlineUser"
        />
      </div>
      <!-- 公開聊天室 -->
      <div class="chatroom">
        <div class="title">
          公開聊天室
        </div>
        <div
          class="message-container"
          ref="messageContainer"
        >
          <!-- 歷史訊息 -->
          <PastChatData
            v-for="pastChatRecord in pastChatRecords"
            :key="pastChatRecord.id"
            :pastChatRecord="pastChatRecord"
          />
          <!-- 當前訊息 -->
          <NowChatData
            v-for="nowChatRecord in nowChatRecords"
            :key="nowChatRecord.id"
            :chatRecord="nowChatRecord"
          />
          <!-- 輸入欄 -->
          <div class="send-box">
            <form @click.stop.prevent="handleSendMsg" class="form-container">
              <input
                type="text"
                name=""
                placeholder="輸入訊息..."
                class="text-input"
                v-model="chatMessage"
              />
              <button type="submit" class="send-btn">
                <img src="../assets/icon/icon_message.svg" alt="send" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import OnlineUsers from './../components/OnlineUsers'
import NowChatData from './../components/NowChat'
import PastChatData from './../components/PastChat'
import NavSidebar from '../components/NavSidebar'
import { mapState } from 'vuex'
import moment from 'moment'
// import { Toast } from './../utils/helpers'

export default {
  name: 'ChatRoom',
  components: {
    NavSidebar,
    OnlineUsers,
    NowChatData,
    PastChatData
  },
  data() {
    return {
      onlineCount: 0,
      onlineUsers: [],
      nowChatRecords: [],
      pastChatRecords: [],
      chatMessage: ''
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  created() {
    this.connectSever()
  },
  watch: {
    pastChatRecords() {
      this.$nextTick(() => {
        const container = this.$refs.messageContainer
        container.scrollTop = container.lastElementChild.offsetTop
      })
    },
    nowChatRecords() {
      this.$nextTick(() => {
        const container = this.$refs.messageContainer
        container.scrollTop = container.lastElementChild.offsetTop
      })
    }
  },
  methods: {
    handleSendMsg() {
      if (this.chatMessage.trim() !== '') {
        const msg = this.chatMessage
        this.$socket.emit('userMsg', msg)
      }
      this.chatMessage = ''
    },
    disconnectSever() {
      this.$socket.disconnect()
    },
    connectSever() {
      this.$socket.connect()
    }
  },
  sockets: {
    connect() {
      console.log('socket connected')
    },
    disconnect() {
      console.log('socket disconnected...')
    },
    // 取得所有上線使用者
    userList(onlineUsers) {
      this.onlineUsers = onlineUsers
    },
    // 統計上線使用者
    onlineCount(onlineCount) {
      this.onlineCount = onlineCount
    },
    // 向聊天室推播其他使用者上線訊息 msgtype:userOnline
    userOnline(userMsg) {
      this.nowChatRecords.push({ ...userMsg })
    },
    // 向聊天室推播其他使用者離線訊息  msg-type:userOffline
    userOffline(userMsg) {
      this.nowChatRecords.push({ ...userMsg })
    },
    // 向聊天室推播訊息 msg-type: localMessage || remoteMessage
    chatMsg(data) {
      if (!data.text) {
        return
      }
      this.nowChatRecords.push({
        id: data.ChatId,
        userId: data.UserId,
        text: data.text,
        msgType:
          data.UserId === this.currentUser.id ? 'isLocalMsg' : 'isRemoteMsg',
        name: data.username,
        avatar: data.avatar,
        time: moment
          .utc()
          .locale('zh_TW')
          .utcOffset('+08:00')
          .format('h:mm a')
      })
    },
    // 留存歷史訊息
    historyMsg(datas) {
      for (const data of datas) {
        this.pastChatRecords.push({
          id: data.id,
          userId: data.UserId,
          text: data.text,
          msgType: data.UserId === this.currentUser.id ? 'isLocalMsg' : 'isRemoteMsg',
          name: data.username,
          avatar: data.avatar,
          time: data.time
        })
      }
    }
  },
  destroyed() {
    console.log('disconnectSever')
    this.disconnectSever()
  }
}
</script>

<style lang="scss" scoped>
/* 三區塊*/
.chatroom-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100vh;

  .left-navbar {
    border-right: 1px solid var(--light-gary-clr);
  }
  /* 上線使用者 */
  .user-list {
    width: 25%;
    border-right: 1px solid var(--light-gary-clr);

    .title {
      font-size: 16px;
      font-weight: 600;
      color: var(--black-clr);
      border-bottom: 1px solid var(--light-gary-clr);
      padding: 20px 15px 15px 15px;
    }
  }
  /* 公開聊天室 */
  .chatroom {
    /* outline: 1px solid red; */
    /* background-color: pink; */
    position: relative;
    width: 50%;
    height: 100vh;
    border-right: 1px solid var(--light-gary-clr);

    .title {
      font-size: 16px;
      font-weight: 600;
      color: var(--black-clr);
      border-bottom: 1px solid var(--light-gary-clr);
      padding: 20px 15px 15px 15px;
    }
    /* 聊天室對話框 */
    .message-container {
      height: calc(100vh - 130px);
      overflow-y: scroll;
      padding: 10px 0;
      .send-box {
        .form-container {
          display: flex;
          align-items: center;
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 60px;
          padding: 20px;
        }
        .text-input {
          outline: none;
          width: 90%;
          border-radius: 50px;
          border: none;
          padding: 10px 20px;
          background-color: var(--dialogue-blue-clr);
          color: var(--cement-gary-clr);
        }
        .send-btn {
          margin-left: 1.5rem;
          border: none;
          background: none;
        }
      }
    }
  }
}
</style>
