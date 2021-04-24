<template>
  <div class="user-card">
    <img class="user-cover" src="https://picsum.photos/245/140" />
    <div class="avatar-container">
      <img src="https://picsum.photos/id/64/100/100" />
    </div>
    <div class="user-profile">
      <div class="user-name">Jane Doe</div>
      <div class="user-account">@heyjohn</div>
      <div class="activity">
        <div class="activity-reply">
          <img src="../assets/icon/icon_reply.svg" alt="relpy" />
          <span class="reply-count">1.5k</span>
        </div>
        <div class="activity-like">
          <img src="../assets/icon/icon_like.svg" alt="like" />
          <span class="like-count">20k</span>
        </div>
      </div>
      <div class="followship">
        <div class="followings-info">
          <span class="followship-count">34 個</span>
          <span class="followship-unit">跟隨中 </span>
        </div>
        <div class="followers-info">
          <span class="followship-count"> 59 位</span>
          <span class="followship-unit">跟隨者</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-card {
  background-color: grey;
  position: relative;
  background: var(--lighter-gray-clr);
  width: 245px;
  height: 314px;
  border-radius: 10px;
  transition: all 100ms ease-out;
  transform: scale(1.0, 1.0);

  .user-cover {
    width: 245px;
    height: 140px;
    border-radius: 10px 10px 0px 0px;
  }
  .avatar-container {
    position: absolute;
    left: 50%;
    top: 64px;
    width: 100px;
    height: 100px;
    transform: translate(-50%, 0);
    background: white;
    border-radius: 50%;

    img {
      position: absolute;
      left: 50%;
      top: 5%;
      transform: translate(-50%, 0);
      width: 91px;
      height: 91px;
      border-radius: 50%;
    }
  }
  .user-profile {
    display: flex;
    flex-direction: column;
    align-items: center;

    .user-name {
      margin-top: 33px;
      font-weight: 900;
      font-style: normal;
      font-size: 15px;
      line-height: 22px;
    }

    .user-account {
      margin-top: 2px;
      font-weight: 400;
      font-size: 15px;
      line-height: 22px;
      color: var(--cement-gary-clr);
    }

    .activity {
      display: flex;
      justify-content: center;
      min-width: 130px;
      height: 24px;
      margin-top: 15px;
    }

    .activity-reply,
    .activity-like {
      display: flex;
      align-items: center;
    }

    .activity-like {
      margin-left: 16.95px;
    }

    span.reply-count,
    span.like-count {
      margin-left: 7.15px;
    }

    .followship {
      display: flex;
      align-items: center;
      min-width: 150px;
      height: 20px;
      margin-top: 15px;
    }

    .followers-info {
      margin-left: 5px;
    }

    .followship-unit {
      color: var(--cement-gary-clr);
    }

    .followship-count,
    .followship-unit {
      font-size: 14px;
    }
  }
}
.user-card:hover {
  transition: all 200ms ease-in;
  transform: scale(1.03, 1.03);
}
</style>
