<template>
  <div class="chatroom-container">
    <Spinner v-if="false" />
    <template v-else>
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
        <div class="message-container">
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
            :nowChatRecord="nowChatRecord"
          />
          <!-- 輸入欄 -->
          <div class="send-box">
            <form @submit.prevent.stop="sendMessage" class="form-container">
              <input
                type="text"
                name=""
                placeholder="輸入訊息..."
                class="text-input"
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
import Spinner from '../components/Spinner'
import NavSidebar from '../components/NavSidebar'
import { mapState } from 'vuex'
import { Toast } from './../utils/helpers'
// import uuidv4 from 'uuid'

// for sockio
import Vue from 'vue'
import store from './../store'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'
const token = localStorage.getItem('token')

const url = 'https://simple-twitter-mysql.herokuapp.com'
const options = {
  reconnectionDelayMax: 10000,
  auth: {
    token: token
  }
}
const connection = new SocketIO(url, options)

Vue.use(
  new VueSocketIO({
    debug: true,
    connection,
    vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
    }
  })
)

export default {
  name: 'ChatRoom',
  components: {
    NavSidebar,
    Spinner,
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
    this.disconnectSever()
    this.connectSever()
  },
  methods: {
    handleSendMsg() {
      if (this.chatMessage.trim() === '') {
        Toast.fire({
          icon: 'warning',
          title: '尚未輸入訊息或只有空白'
        })
        return
      }
      this.send()
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
    // 取得所有上線使用者
    userList(onlineUsers) {
      this.onlineUsers = onlineUsers
    },
    // 統計上線使用者
    onlineCount(onlineCount) {
      this.onlineCount = onlineCount
    }
    // 向聊天室推播其他使用者上線訊息 msg-type:userOnline
    // userOnline(onlineUser) {
    //   this.nowChatData.push({
    //     id: uuidv4(),
    //     msgType: 'broadcast-online',
    //     name: onlineUser.name
    //   })
    // },
    // 向聊天室推播其他使用者離線訊息  msg-type:userOffline
    // userOffline(offlineUser) {
    //   this.nowChatData.push({
    //     id: uuidv4(),
    //     msgType: 'broadcast-offline',
    //     name: offlineUser.name
    //   })
    // },
    // 向聊天室推播訊息 msg-type: localMessage || remoteMessage
    // message(data) {
    // this.nowChatRecords.push({ ...data })
    // },
    // 留存歷史訊息
    // message(data) {
    // this.nowChatRecords.push({ ...data })
    // }
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
