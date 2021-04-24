<template>
  <header>
    <unicon
      name="cst-back-icon"
      fill="black"
      viewBox="0 0 64 64"
      width="36px"
      height="36px"
    ></unicon>
    <div class="summary">
      <span class="name">name</span>
      <span class="post">23則貼文</span>
    </div>
  </header>
</template>

<script>
export default {
  name: 'UserHeader'
}
</script>

<style lang="scss" scoped>
@mixin name-style {
  color: var(--black-clr);
  font-weight: 900;
  font-size: 1.187rem;
}

header {
  display: flex;
  align-items: center;
  height: 55px;

  .unicon {
    display: flex;
    align-items: center;
    margin: 0 40px 0 15px;
  }

  .back-btn {
    display: inline-block;
    margin-right: 40px;
    margin-left: 15px;
    width: 24px;
    height: 24px;
  }

  .summary {
    display: flex;
    flex-direction: column;

    .name {
      @include name-style;
    }

    .post {
      color: var(--cement-gary-clr);
      font-weight: 500;
      font-size: 0.812rem;
    }
  }
}

::v-deep svg {
  transform: scale(0.67);
}
</style>
