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
          <div class="title">上線使用者(6)</div>
          <!-- 一位使用者 -->
          <div class="user-container d-flex align-items-center">
            <router-link to="/" class="user-avatar">
              <img src="https://upload.cc/i1/2020/10/12/mxC0cD.jpeg" />
            </router-link>
            <div class="user-name">Roger</div>
            <div class="user-account">@rogerfederer</div>
          </div>
        </div>

        <!-- 公開聊天室 -->
        <div class="chatroom">
          <div class="title">
            公開聊天室
          </div>
          <!-- 對話框開始 -->
          <div class="message-container">
            <!-- 遠端使用者上線提示 -->
            <div class="user-active">
              <span class="user-active-txt"> 使用者上線 </span>
            </div>

            <!-- ###歷史訊息### -->
            <div class="message-box">
              <!-- 本地使用者 -->
              <div class="local-msg">
                <div class="send-text">
                  test messsage 123445678989
                </div>
                <div class="send-time">
                  1小時前
                </div>
              </div>
              <!-- 遠端使用者 -->
              <div class="remote-msg">
                <div class="avatar">
                  <img src="https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/9442/FEwebinar_IronMan.jpeg" alt="avatar" />
                </div>
                <div class="msg-box">
                  <div class="receive-text">
                    hello 123 準備要去征服那美克星
                  </div>
                  <div class="receive-time">
                    1小時前
                  </div>
                </div>
              </div>
            </div>
            <!-- 遠端使用者下線提示 -->
            <div class="user-active">
              <span class="user-active-txt"> 使用者離線 </span>
            </div>
            <!-- ###新訊息### -->
            <div class="message-box">
              <!-- 本地使用者 -->
              <div class="local-msg">
                <div class="send-text">
                  怎麼又回來了？
                </div>
                <div class="send-time">
                  10分鐘前
                </div>
              </div>
              <!-- 遠端使用者 -->
              <div class="remote-msg">
                <div class="avatar">
                  <img src="https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/9442/FEwebinar_IronMan.jpeg" alt="avatar" />
                </div>
                <div class="msg-box">
                  <div class="receive-text">
                    打不過超級賽亞人
                  </div>
                  <div class="receive-time">
                    9分鐘前
                  </div>
                </div>
              </div>
              <!-- 本地使用者 -->
              <div class="local-msg">
                <div class="send-text">
                  去吃碗麵壓壓驚
                </div>
                <div class="send-time">
                  5分鐘前
                </div>
              </div>
            </div>
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
import Spinner from '../components/Spinner'
import NavSidebar from '../components/NavSidebar'
import { mapState } from 'vuex'
export default {
  name: 'ChatRoom',
  components: {
    NavSidebar,
    Spinner
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(['currentUser'])
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

    .user-container {
      /* outline: 1px solid red; */
      width: 100%;
      padding: 15px;

      .user-avatar > img {
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

      .user-active {
        text-align: center;
        margin: 10px 0;

        .user-active-txt {
          background-color: var(--gray-clr);
          color: var(--cement-gary-clr);
          padding: 5px 15px;
          border-radius: 20px;
        }
      }
      .message-box {
        .local-msg {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          margin-bottom: 10px;

          .send-text {
            padding: 10px 15px;
            border-radius: 40px 40px 0 40px;
            margin-right: 20px;
            margin-left: auto;
            background: var(--primary-clr);
            color: white;
          }
          .send-time {
            /* outline: 1px solid red; */
            text-align: right;
            margin-right: 20px;
            color: var(--cement-gary-clr);
            font-size: 13px;
          }
        }
        .remote-msg {
          display: flex;

          .avatar {
            /* outline: 1px solid red; */
            margin-left: 10px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            overflow: hidden;
            flex-shrink: 0;

            img {
              width: 100%;
              height: 100%;
              vertical-align: middle;
              object-fit: cover;
            }
          }
          .msg-box {
            .receive-text {
              background:var(--dialogue-blue-clr);
              padding: 10px 15px;
              margin-left: 13px;
              margin-right: 90px;
              position: relative;
              border-radius: 40px 40px 40px 0;
            }
            .receive-time {
              display: inline-block;
              margin-left: 13px;
              color: var(--cement-gary-clr);
              font-size: 13px;
            }
          }
        }
      }
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
