<template>
  <transition v-if="showPopupView" name="fade">
    <div class="popup">
      <div class="popup-container">
        <div class="post-container">
          <header>
            <button class="btn close-btn" @click="handleClose">
              <unicon name="multiply" fill="#ff6600"></unicon>
            </button>
          </header>
          <section>
            <div class="post-panel">
              <img class="avatar" src="https://picsum.photos/50" />
              <textarea
                class="tweet-input-box"
                name="tweet"
                id=""
                cols="20"
                rows="4"
                placeholder="有什麼新鮮事？"
              ></textarea>
              <div class="btn-wrapper">
                <button class="btn post-btn">推文</button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'UserPostPopup',
  props: {
    showPopupView: {
      type: Boolean,
      require: true,
      default: false
    }
  },
  methods: {
    handleClose() {
      this.$emit('after-close')
    }
  }
}
</script>

<style lang="scss" scoped>
.popup {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.4);
}

.post-container {
  overflow: hidden;
  margin: 54px auto;
  max-width: 600px;
  width: 600;
  border-radius: 14px;
  background-color: #fff;

  header {
    margin-top: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid var(--light-gary-clr);

    button {
      margin-left: 15px;
      padding: 0;
      width: 24px;
      height: 24px;
      line-height: 0;
    }
  }

  .avatar {
    float: left;
    margin: 10px 10px 10px 15px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  .tweet-input-box {
    margin-top: 20px;
    width: calc(100% - 75px);
    border: none;
    font-weight: 500;
    font-size: 18px;
    line-height: 26px;
    resize: none;

    &:focus {
      outline: none;
      border: 0;
    }
  }

  .btn-wrapper {
    padding: 15px;
    text-align: right;

    .post-btn {
      padding: 11px 14px;
      height: 40px;
      border-radius: 20px;
      background-color: var(--primary-clr);
      color: #fff;
      line-height: 1;
    }
  }
}

.btn:focus {
  box-shadow: none;
}
</style>
