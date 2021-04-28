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
              <div class="avatar-wrapper">
                <img class="avatar" :src="currentUser.avatar" />
              </div>
              <textarea
                v-model="description"
                class="tweet-input-box"
                cols="20"
                rows="4"
                placeholder="有什麼新鮮事？"
              ></textarea>
              <div class="btn-wrapper">
                <button class="btn post-btn" @click="createPostHandle">
                  推文
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import tweetsAPI from '../apis/tweets'
import { Toast } from '../utils/helpers'
import { mapState } from 'vuex'

export default {
  name: 'UserPostPopup',
  props: {
    showPopupView: {
      type: Boolean,
      require: true,
      default: false
    }
  },
  computed: {
    ...mapState(['currentUser', 'isReloadPost'])
  },
  data() {
    return {
      description: ''
    }
  },
  methods: {
    handleClose() {
      this.$emit('after-close')
    },
    createPostHandle() {
      if (this.description.trim().length < 1) {
        Toast.fire({
          icon: 'warning',
          title: '請輸入推文'
        })
        return
      }
      this.createTweet({ description: this.description })
    },
    async createTweet({ description }) {
      try {
        const { data } = await tweetsAPI.createTweet({ description })

        if (data.status === 'success') {
          Toast.fire({
            icon: 'success',
            title: '新增推文成功'
          })
        }

        this.$store.commit('setReloadPost', true)

        setTimeout(() => {
          this.$emit('after-close')
        }, 1500)
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '新增推文失敗'
        })
        console.log(error)
      }
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

  .avatar-wrapper {
    float: left;
    overflow: hidden;
    margin: 10px 10px 10px 15px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: var(--light-gary-clr);
    .avatar {
      width: 100%;
      height: 100%;
    }
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
