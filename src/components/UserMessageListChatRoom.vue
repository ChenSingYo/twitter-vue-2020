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
      <div class="user-list-container">
        <div class="img-wrapper">
          <img src="https://picsum.photos/50" alt="" />
        </div>
        <div class="info-container">
          <span class="name">Name</span>
          <span class="account">@Tag</span>
          <p class="message">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam,
            itaque.
          </p>
        </div>
        <div class="last-time">
          5 秒
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'UserChartRoom'
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
    border-bottom: 1px solid var(--light-gary-clr);

    .img-wrapper {
      float: left;
      overflow: hidden;
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
      padding: 10px 0;
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
        width: calc(80% - 75px);
        color: var(--black-clr);
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
