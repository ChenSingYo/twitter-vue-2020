<template>
  <div class="cell">
    <div class="cell-container">
      <img class="avatar" src="https://picsum.photos/50" />
      <div class="info-container">
        <div class="name">Name</div>
        <div class="tag">@Tag</div>
        <p class="content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
          mollitia aliquid voluptas corporis voluptatibus exercitationem!
          Consequatur dolor repellat, reprehenderit minus beatae perspiciatis
          possimus sapiente architecto accusantium voluptate asperiores ab ex?
        </p>
        <button class="btn follow-btn isActive">正在跟隨</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserFollowCell'
}
</script>

<style lang="scss" scoped>
.cell-container {
  position: relative;
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

  .tag {
    color: var(--cement-gary-clr);
    font-weight: bold;
    font-size: 0.937rem;
  }

  .content {
    margin-bottom: 0;
    letter-spacing: 0.6px;
    font-weight: 500;
    font-size: 0.937rem;
    line-height: 22px;
  }

  .follow-btn {
    position: absolute;
    top: 0;
    right: 0;
    margin: 10px 15px;
    padding: 0 16px;
    height: 30px;
    border: 1px solid var(--primary-clr);
    border-radius: 20px;
    color: var(--primary-clr);
    line-height: 0;

    &.isActive {
      background-color: var(--primary-clr);
      color: #fff;
    }
  }
}
</style>
