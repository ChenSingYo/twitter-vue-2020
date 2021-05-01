<template>
  <div>
    <!-- 遠端使用者上線提示 -->
    <div class="user-active">
      <span class="user-active-txt"> 使用者上線 </span>
    </div>
    <!-- 遠端使用者下線提示 -->
    <div class="user-active">
      <span class="user-active-txt"> 使用者離線 </span>
    </div>
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
          <img
            src="https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/9442/FEwebinar_IronMan.jpeg"
            alt="avatar"
          />
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
  </div>
</template>

<script>
export default {
  name: 'PastChatRecords',
  props: {
    chatData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      messageType: this.chatData.messageType,
      isBroadcastOnline: false,
      isBroadcastOffline: false,
      isMessageOther: false,
      isMessageSelf: false
    }
  },
  created() {
    this.handleData()
  },
  methods: {
    handleData() {
      switch (this.messageType) {
        case 'broadcast-online':
          this.isBroadcastOnline = true
          this.isBroadcastOffline = false
          this.isMessageOther = false
          this.isMessageSelf = false
          break
        case 'broadcast-offline':
          this.isBroadcastOnline = false
          this.isBroadcastOffline = true
          this.isMessageOther = false
          this.isMessageSelf = false
          break
        case 'message-other':
          this.isBroadcastOnline = false
          this.isBroadcastOffline = false
          this.isMessageOther = true
          this.isMessageSelf = false
          break
        case 'message-self':
          this.isBroadcastOnline = false
          this.isBroadcastOffline = false
          this.isMessageOther = false
          this.isMessageSelf = true
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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
