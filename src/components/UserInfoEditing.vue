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
            <button class="btn save-btn" @click="updateHandle">儲存</button>
          </header>
          <section>
            <div class="cover-img">
              <img :src="currentUser.cover" alt="" />
              <div class="edit-img-wrapper">
                <div class="cover-input">
                  <label for="cover">
                    <unicon name="camera-plus" fill="white"></unicon>
                  </label>
                  <input
                    id="cover"
                    type="file"
                    name="image"
                    accept="image/*"
                    @change="handleCoverFileChange"
                  />
                </div>
                <div class="remove-cover">
                  <button class="btn">
                    <unicon name="multiply" fill="white"></unicon>
                  </button>
                </div>
              </div>
            </div>
            <div class="avatar-container">
              <img :src="currentUser.avatar" alt="" />
              <label for="avatar">
                <unicon name="camera-plus" fill="white"></unicon>
              </label>
              <input
                id="avatar"
                type="file"
                name="image"
                accept="image/*"
                @change="handleAvatarFileChange"
              />
            </div>
          </section>
          <section class="input">
            <label for="">名稱</label>
            <input v-model="currentUser.name" type="text" maxlength="50" />
            <span> {{ currentUser.name.length }}/50</span>
          </section>
          <section class="input">
            <label for="summary">自我介紹</label>
            <textarea
              v-model="currentUser.introduction"
              id="summary"
              cols="20"
              rows="4"
              maxlength="160"
            ></textarea>
            <span>{{ currentUser.introduction.length }}/160</span>
          </section>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import usersAPI from '../apis/users'
import { Toast } from '../utils/helpers'
import { emptyImageFilter } from '../utils/mixins'

export default {
  mixins: [emptyImageFilter],
  name: 'UserInfoEditing',
  props: {
    showPopupView: {
      type: Boolean,
      require: true,
      default: false
    },
    initialCurrentUser: {
      id: -1,
      account: '',
      name: '',
      avatar: '',
      cover: '',
      introduction: ''
    }
  },
  data() {
    return {
      currentUser: {
        id: -1,
        account: '',
        name: '',
        avatar: '',
        cover: '',
        introduction: ''
      }
    }
  },
  watch: {
    showPopupView(newValue) {
      if (newValue) {
        this.currentUser = { ...this.initialCurrentUser }
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('after-close')
    },
    handleAvatarFileChange(e) {
      const { files } = e.target
      if (files.length === 0) {
        // 使用者沒有選擇上傳的檔案
        this.currentUser.avatar = ''
      } else {
        const imageURL = window.URL.createObjectURL(files[0])
        this.currentUser.avatar = imageURL
      }
    },
    handleCoverFileChange(e) {
      const { files } = e.target
      if (files.length === 0) {
        // 使用者沒有選擇上傳的檔案
        this.currentUser.cover = ''
      } else {
        const imageURL = window.URL.createObjectURL(files[0])
        this.currentUser.cover = imageURL
      }
    },
    updateHandle() {
      this.updateUserInfo()
    },
    async updateUserInfo() {
      let updateData = {
        name: this.currentUser.name,
        introduction: this.currentUser.introduction,
        cover: this.currentUser.cover,
        avatar: this.currentUser.avatar
      }

      try {
        const { data } = usersAPI.editAccount(this.currentUser.id, {
          payload: { ...updateData }
        })

        if (data.status === 'success') {
          Toast.fire({
            icon: 'success',
            title: '更新成功'
          })

          setTimeout(() => {
            this.handleClose()
          }, 1500)
        }
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '更新失敗，請稍後再試'
        })
      }
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

    img {
      width: 100%;
      height: 100%;
      opacity: 0.5;

      object-fit: cover;
    }

    .edit-img-wrapper {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;

      .cover-input {
        padding: 0 15px;
        label {
          margin: 0;
          text-align: center;
          cursor: pointer;
        }
        input {
          display: none;
        }
      }

      .remove-cover {
        padding: 0 15px;
        .btn {
          margin: 0;
          padding: 0;
          width: 24px;
          height: 24px;
          line-height: 1;
        }
      }
    }
  }

  .avatar-container {
    position: relative;
    z-index: 5;
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

      object-fit: cover;
    }

    label {
      position: absolute;
      top: 50%;
      left: 50%;
      margin: 0;
      width: auto;
      cursor: pointer;
      transform: translate(-50%, -50%);
    }

    input {
      display: none;
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

.btn {
  box-shadow: none;
}
</style>
