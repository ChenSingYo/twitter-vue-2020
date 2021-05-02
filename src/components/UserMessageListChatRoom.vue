<template>
  <div class="chart-room">
    <header class="header">
      <div class="title">訊息</div>
      <div class="add-message">
        <unicon
          name="add-message"
          viewBox="0 0 512 512"
          width="22px"
          height="22px"
        ></unicon>
      </div>
    </header>

    <section class="user-list">
      <div
        v-for="user in users"
        :key="user.id"
        class="user-list-container"
        @click="selectedUserHandle(user)"
      >
        <div class="img-wrapper">
          <img :src="user.avatar" alt="" />
        </div>
        <div class="info-container">
          <span class="name">{{ user.name }}</span>
          <span class="account">{{ user.account }}</span>
          <p class="message">
            {{ user.text }}
          </p>
        </div>
        <div class="last-time">
          {{ user.time }}
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'UserMessageListChatRoom',
  props: {
    users: {
      type: Array
    }
  },
  methods: {
    selectedUserHandle(user) {
      console.log(user)
      this.$emit('after-selected-user', user)
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-room {
  flex-basis: 350px;
  width: 350px;
  height: 100%;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 55px;
    border-bottom: 1px solid var(--light-gary-clr);

    .title {
      margin-left: 24px;
      color: var(--black-clr);
      font-weight: bold;
      font-size: 19px;
    }

    .add-message {
      margin-right: 24px;
      cursor: pointer;
    }
  }

  .user-list-container {
    position: relative;
    display: flex;
    border-bottom: 1px solid var(--light-gary-clr);
    cursor: pointer;

    .img-wrapper {
      overflow: hidden;
      flex-shrink: 0;
      margin: 10px 10px 10px 15px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: var(--light-gary-clr);

      &img {
        width: 100%;
        height: 100%;
      }
    }

    .info-container {
      overflow: hidden;
      padding: 10px 0;
      width: 100%;

      .name {
        color: var(--black-clr);
        font-weight: 700;
        font-size: 0.937rem;
      }

      .account {
        color: var(--cement-gary-clr);
        font-weight: 500;
        font-size: 0.937rem;
      }

      .message {
        overflow: hidden;
        margin: 0;
        color: var(--cement-gary-clr);
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: 700;
      }
    }

    .last-time {
      position: absolute;
      top: 10px;
      right: 15px;
      color: var(--cement-gary-clr);
      font-weight: 500;
      font-size: 0.937rem;
    }
  }
}
</style>
