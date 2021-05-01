<template>
  <div class="chat-room">
    <header class="header">
      <div class="name">Name</div>
      <div class="account">@Tag</div>
    </header>

    <section class="message-body">
      <template>
        <div class="self-message-container">
          <div class="message">Hello world</div>
          <div class="send-time">2020-05-01</div>
        </div>
      </template>
      <template>
        <div class="other-message-container">
          <div class="img-wrapper">
            <img src="https://picsum.photos/40" alt="" />
          </div>
          <div class="info-container">
            <div class="message">Hello world</div>
            <div class="send-time">2020-05-01</div>
          </div>
        </div>
      </template>
    </section>

    <section class="send-message">
      <input type="text" name="" placeholder="輸入訊息..." class="text-input" />
      <button type="submit" class="send-btn">
        <img src="../assets/icon/icon_message.svg" alt="send" />
      </button>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ChatRoom',
  data() {
    return {
      isSelf: false
    }
  }
}
</script>

<style lang="scss" scoped>
.chat-room {
  position: relative;
  flex-grow: 1;
  padding-bottom: 55px;
  height: 100%;
  border-left: 1px solid var(--light-gary-clr);

  .header {
    display: flex;
    flex-direction: column;
    padding-left: 24px;
    height: 55px;
    border-bottom: 1px solid var(--light-gary-clr);
    .name {
      color: var(--black-clr);
      font-weight: 700;
      font-size: 19px;
    }

    .account {
      color: var(--cement-gary-clr);
      font-weight: 500;
      font-size: 0.937rem;
    }
  }

  .message-body {
    display: flex;
    overflow-y: scroll;
    flex-direction: column;
    justify-content: flex-end;
    height: calc(100% - 55px);
    background-color: lightblue;

    &::-webkit-scrollbar {
      width: 0;
    }

    .self-message-container {
      display: flex;
      align-items: flex-end;
      flex-direction: column;
      margin-bottom: 10px;
      width: 100%;

      .message {
        margin-right: 15px;
        padding: 10px 15px;
        max-width: 70%;
        border-radius: 40px 40px 0 40px;
        background: var(--primary-clr);
        color: white;
      }

      .send-time {
        margin-right: 15px;
        color: var(--cement-gary-clr);
        font-size: 13px;
      }
    }

    .other-message-container {
      display: flex;
      align-items: flex-start;
      margin-bottom: 10px;
      width: 100%;

      .img-wrapper {
        overflow: hidden;
        margin: 0 10px 10px 15px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: var(--light-gary-clr);

        &img {
          width: 100%;
          height: 100%;
        }
      }

      .info-container {
        .message {
          padding: 10px 15px;
          border-radius: 40px 40px 40px 0;
          background: var(--dialogue-blue-clr);
        }

        .send-time {
          color: var(--cement-gary-clr);
          font-size: 13px;
        }
      }
    }
  }

  .send-message {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 55px;
    background-color: #fff;

    .text-input {
      padding: 10px 20px;
      width: 90%;
      border: none;
      border-radius: 50px;
      background-color: var(--dialogue-blue-clr);
      color: var(--cement-gary-clr);

      &:focus {
        outline: 0;
        box-shadow: none;
      }
    }

    .send-btn {
      margin-left: 1.5rem;
      border: none;
      background: none;
    }
  }
}
</style>
