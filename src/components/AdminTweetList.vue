<template>
  <div class="cell cell-container">
    <img class="avatar" src="https://picsum.photos/45" />
      <p class="loading" v-if="false">Loading...</p>
      <div class="info-container">
        <span class="name">Apple</span>
        <span class="tag">@apple</span>
        <span class="time">1 小時</span>
        <p class="content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
          mollitia aliquid voluptas corporis voluptatibus exercitationem!
          Consequatur dolor repellat.
        </p>
      </div>
  </div>
</template>

<script>
export default {
  name: 'AdminTweetList'
}
</script>

<style lang="scss" scoped>

.cell-container {
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid var(--light-gary-clr);

  .avatar {
    margin: 3px 15px 10px 15px;
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
    font-weight: medium;
    font-size: 0.937rem;
  }

  .time {
    &::before {
      display: inline-block;
      font-weight: bold;
      content: '・';
    }
  }

  .content {
    margin-bottom: 10px;
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 22px;
  }
}
</style>
