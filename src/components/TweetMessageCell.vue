<template>
  <div class="cell">
    <div class="cell-container">
      <img class="avatar" src="https://picsum.photos/50" />
      <div class="info-container">
        <span class="name">Name</span>
        <span class="tag">@Tag</span>
        <span class="time">Time</span>
        <p class="content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
          mollitia aliquid voluptas corporis voluptatibus exercitationem!
          Consequatur dolor repellat, reprehenderit minus beatae perspiciatis
          possimus sapiente architecto accusantium voluptate asperiores ab ex?
        </p>
        <div class="social-container">
          <div class="message">
            <img src="" alt="" />
            <span>123</span>
          </div>
          <div class="favorite">
            <img src="" alt="" />
            <span>76</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TweetMessageCell"
};
</script>

<style lang="scss" scoped>
.cell-container {
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid var(--light-gary-clr);

  .avatar {
    margin: 10px 10px 10px 15px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  .name {
    color: var(--black-clr);
    font-weight: 700;
    font-size: 0.937rem;
  }

  .tag,
  .time {
    margin-left: 5px;
    color: var(--cement-gary-clr);
    font-weight: bold;
    font-size: 0.937rem;
  }

  .time {
    &::before {
      display: inline-block;
      content: "・";
    }
  }

  .content {
    margin-bottom: 10px;
    letter-spacing: 0.6px;
    font-weight: 500;
    font-size: 0.937rem;
    line-height: 22px;
  }

  .social-container {
    display: flex;

    .message,
    .favorite {
      cursor: pointer;
    }

    .message span,
    .favorite span {
      color: var(--cement-gary-clr);
      font-weight: 500;
      font-size: 0.812rem;
    }

    .favorite {
      margin-left: 50px;
    }

    img {
      margin-right: 10px;
      width: 15px;
      height: 15px;
    }
  }
}
</style>
