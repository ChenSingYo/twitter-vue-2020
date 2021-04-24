<template>
  <div>
    <header>
      <unicon
        v-if="enableBackBtn"
        name="cst-back-icon"
        fill="black"
        viewBox="0 0 64 64"
        width="24px"
        height="24px"
        @click="handleBack"
      ></unicon>
      <span class="title" :class="{ 'ml-0': enableBackBtn }">{{ title }}</span>
    </header>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    title: {
      type: String,
      default: ''
    },
    enableBackBtn: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleBack() {
      console.log('back')
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  height: 55px;
  border-bottom: 1px solid var(--light-gary-clr);

  .unicon {
    display: flex;
    align-items: center;
    margin: 0 40px 0 15px;
    cursor: pointer;
  }

  .title {
    margin-left: 24px;
    color: var(--black-clr);
    font-weight: bold;
    font-size: 19px;
  }
}
</style>
