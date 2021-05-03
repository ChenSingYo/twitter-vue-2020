<template>
  <div>
    <!-- 遠端使用者上線提示 -->
    <div class="user-active" v-if="userIsOnline">
      <span class="user-active-txt"> {{chatRecord.text}}</span>
    </div>
    <!-- 遠端使用者下線提示 -->
    <div class="user-active" v-if="userIsOffline">
      <span class="user-active-txt"> {{chatRecord.text}} </span>
    </div>
    <div class="message-box">
    <!-- 遠端使用者 -->
      <div class="remote-msg" v-if="isRemoteMsg">
        <div class="avatar">
          <img
            :src="chatRecord.avatar"
            alt="avatar"
          />
        </div>
        <div class="msg-box">
          <div class="receive-text">
            {{chatRecord.text}}
          </div>
          <div class="receive-time">
            {{chatRecord.time}}
          </div>
        </div>
      </div>
      <!-- 本地使用者 -->
      <div class="local-msg" v-if="isLocalMsg">
        <div class="send-text">
          {{chatRecord.text}}
        </div>
        <div class="send-time">
          {{chatRecord.time}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatRecords',
  props: {
    chatRecord: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      msgType: this.chatRecord.msgType,
      userIsOnline: false,
      userIsOffline: false,
      isRemoteMsg: false,
      isLocalMsg: false
    }
  },
  created() {
    this.handleData()
  },
  methods: {
    handleData() {
      switch (this.msgType) {
        case 'userOnline':
          this.userIsOnline = true
          this.userIsOffline = false
          this.isRemoteMsg = false
          this.isLocalMsg = false
          break
        case 'userOffline':
          this.userIsOnline = false
          this.userIsOffline = true
          this.isRemoteMsg = false
          this.isLocalMsg = false
          break
        case 'isRemoteMsg':
          this.userIsOnline = false
          this.userIsOffline = false
          this.isRemoteMsg = true
          this.isLocalMsg = false
          break
        case 'isLocalMsg':
          this.userIsOnline = false
          this.userIsOffline = false
          this.isRemoteMsg = false
          this.isLocalMsg = true
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.user-active {
  display: flex;
  height: 30px;
  justify-content: center;
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
        background: var(--dialogue-blue-clr);
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
</style>
