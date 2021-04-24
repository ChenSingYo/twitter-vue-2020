<template>
  <div class="cell">
    <div class="cell-container">
      <img class="avatar" src="https://picsum.photos/50" />
      <div class="info-container">
        <div class="message-wrapper">
          <span class="name">Name</span>
          <span class="tag">{{ '@Tag' }}・{{ '13 Hour' }}</span>
        </div>
        <div class="reply-wrapper">
          <span class="reply-text">回覆</span>
          <span class="reply-tag">@apple</span>
        </div>
        <p class="content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, minus.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReplyCell'
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
    margin-right: 5px;
    color: var(--black-clr);
    font-weight: 700;
    font-size: 0.937rem;
  }

  .tag {
    color: var(--cement-gary-clr);
    font-weight: 500;
    font-size: 0.937rem;
  }

  .reply-text {
    margin-right: 5px;
    color: var(--cement-gary-clr);
    font-weight: 500;
    font-size: 0.937rem;
  }

  .reply-tag {
    color: var(--primary-clr);
    font-weight: 500;
    font-size: 0.937rem;
  }

  .content {
    margin-bottom: 0;
    color: var(--black-clr);
    letter-spacing: 0.6px;
    font-weight: 500;
    font-size: 0.937rem;
    line-height: 22px;
  }
}
</style>
