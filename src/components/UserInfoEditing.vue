<template>
  <transition v-if="showPopupView" name="fade">
    <div class="popup">
      <div class="popup-container">
        <div class="profile-container">
          <header>
            <div class="close" @click="handleClose">
              <unicon name="multiply" fill="black"></unicon>
            </div>
            <div class="text">編輯個人資料</div>
            <button class="btn save-btn">儲存</button>
          </header>
          <section>
            <div class="cover-img">
              <img src="https://picsum.photos/600/200" alt="" />
              <div class="edit-img-wrapper">
                <button class="btn">
                  <unicon name="camera-plus" fill="white"></unicon>
                </button>
                <button class="btn">
                  <unicon name="multiply" fill="white"></unicon>
                </button>
              </div>
            </div>
            <div class="avatar-container">
              <img src="https://picsum.photos/120" alt="" />
              <button class="btn">
                <unicon name="camera-plus" fill="white"></unicon>
              </button>
            </div>
          </section>
          <section class="input">
            <label for="">名稱</label>
            <input type="text" maxlength="50" />
            <span>8/50</span>
          </section>
          <section class="input">
            <label for="summary">自我介紹</label>
            <textarea
              id="summary"
              cols="20"
              rows="4"
              maxlength="160"
            ></textarea>
            <span>8/160</span>
          </section>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'EditUserProfile',
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
@mixin font-style {
  color: var(--cement-gary-clr);
  font-weight: 500;
  font-size: 0.937rem;
}

.popup {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.4);
}

.profile-container {
  overflow: hidden;
  margin: 54px auto;
  max-width: 600px;
  width: 600;
  border-radius: 14px;
  background-color: #fff;

  header {
    display: flex;
    align-items: center;
    padding: 15px;

    .close {
      margin-right: 40px;
      width: 24px;
      height: 24px;

      .unicon {
        display: flex;
        align-items: center;
      }
    }

    .text {
      color: var(--black-clr);
      font-weight: 500;
      font-size: 19px;
    }

    .save-btn {
      margin-left: auto;
      padding: 6px 14px;
      height: 30px;
      border-radius: 15px;
      background-color: var(--primary-clr);
      color: #fff;
      font-size: 18px;
      line-height: 0;
    }
  }

  .cover-img {
    position: relative;
    overflow: hidden;
    height: 200px;
    background-color: var(--water-gary-clr);

    &::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1;
      background-color: rgba(255, 255, 255, 0.5);
      content: '';
    }

    .edit-img-wrapper {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 5;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .avatar-container {
    position: relative;
    z-index: 2;
    overflow: hidden;
    margin-top: -70px;
    margin-left: 15px;
    width: 120px;
    height: 120px;
    border: 4px solid #fff;
    border-radius: 50%;

    img {
      width: 100%;
      height: 100%;
    }

    button {
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 4;
      transform: translate(-50%, -50%);
    }

    &::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 3;
      background-color: rgba(255, 255, 255, 0.2);
      content: '';
    }
  }

  .input {
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 20px 15px;
    border-bottom: 2px solid var(--cement-gary-clr);
    border-radius: 0px 0px 4px 4px;
    border-radius: 4px;
    background-color: var(--water-gary-clr);

    &:last-child {
      margin-top: 40px;
      margin-bottom: 70px;
    }

    label {
      margin-bottom: 0;
      padding: 5px 15px;

      @include font-style;
    }

    input {
      padding: 0 15px;
      height: 24px;
      border: 0;
      background-color: transparent;
      color: var(--black-clr);
      font-weight: 500;
      font-size: 19;
      &:focus {
        outline: 0;
      }
    }

    span {
      position: absolute;
      top: 100%;
      right: 0;
      margin-top: 5px;

      @include font-style;
    }

    textarea {
      padding: 0 15px;
      border: none;
      background-color: transparent;
      color: var(--black-clr);
      font-weight: 500;
      font-size: 19;
      resize: none;
      &:focus {
        outline: none;
        border: 0;
      }
    }
  }
}
</style>
