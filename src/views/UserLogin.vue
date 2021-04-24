<template>
  <div class="container">
    <!-- logo bar-->
    <div class="logo-bar header">
      <img src="../assets/icon/Icon.png" alt="logo" width="40px" />
    </div>
    <!-- title bar-->
    <div class="title-bar header">
      <span>登入 Alphitter</span>
    </div>
    <form @submit.prevent.stop="handleSubmit">
      <!-- 帳號 -->
      <div class="form-label-group">
        <label for="account">帳號</label>
        <input
          v-model="account"
          ref="account"
          id="account"
          name="account"
          type="text"
          class="form-control"
          autocomplete="useraccount"
        />
      </div>
      <!-- 密碼 -->
      <div class="form-label-group">
        <label for="password">密碼</label>
        <input
          v-model="password"
          id="password"
          name="password"
          type="password"
          class="form-control"
        />
      </div>
      <div class="form-label-group button-wrapper">
        <button
          class="btn btn-primary btn-block submit-button"
          :disabled="isProcessing"
          type="submit"
        >
          登入
        </button>
      </div>
      <div class="form-bottom">
        <router-link class="text-link" to="/regist">
          註冊 Alphitter
        </router-link>
        <span>·</span>
        <router-link class="text-link" to="/admin">
          後台登入
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import authorizationAPI from './../apis/authorization'
import { Toast } from './../utils/helpers'

export default {
  name: 'UserLogin',
  data () {
    return {
      account: '',
      password: '',
      isProcessing: false
    }
  },
  methods: {
    async handleSubmit () {
      try {
        this.isProcessing = true
        if (!this.account || !this.password) {
          Toast.fire({
            icon: 'warning',
            title: '請輸入帳號(e.g. @alphacamp)和密碼 '
          })
        }
        // post request to API and get response.data
        const { data } = await authorizationAPI.userSignIn({
          account: this.account,
          password: this.password
        })
        console.log(data)
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        // keep token in localStorage
        localStorage.setItem('token', data.token)
        // this.$store.commit('revokeCurrentUser')
        this.$router.push('/tweets')
        this.isProcessing = false
      } catch (err) {
        this.isProcessing = false
        Toast.fire({
          icon: 'warning',
          title: `帳號密碼有誤: ${err.message}`
        })
        this.password = ''
      }
    },
    autoFocus () {
      this.$refs.account.focus()
    }
  },
  mounted () {
    this.autoFocus()
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin-top: 50px;
  width: 50%;
  justify-content: center;

  .header {
    text-align: center;
    margin-bottom: 30px;
  }
  .title-bar {
    margin-bottom: 20px;
    font-weight: bold;
    span {
      font-size: 23px;
    }
  }
  .form-label-group {
    border-radius: 4px;
    position: relative;
    height: 50px;
    margin-bottom: 20px;
    background: #f5f8fa;
    display: flex;
    align-items: flex-end;
    justify-content: center;

    label {
      color: #657786;
      position: absolute;
      font-size: 15px;
      height: 25px;
      width: 100%;
      padding: 3px 0 0 8px;
      top: 0;
      cursor: text;
    }
    .form-control {
      border: none;
      border-bottom: 3px solid #657786;
      border-bottom-right-radius: 2px;
      border-bottom-left-radius: 2px;
      height: 25px;
      background: #f5f8fa;
      padding: 0px 10px;
      outline-width: 0;

      .form-bottom {
        text-align: end;
      }
    }
    .form-control:focus,
    .form-control:hover {
      box-shadow: none;
      border-color: #ff6600;
    }
  }
  .button-wrapper {
    height: 50px;
    padding-top: 10px;
    margin-bottom: 20px;
    background: none;
    flex-flow: column;
    align-items: center;

    .submit-button {
      font-weight: 500;
      height: 50px;
      border: none;
      border-radius: 50px;
      color: white;
      background-color: #ff6600;
    }
  }
  .form-bottom {
    text-align: end;
    .text-link {
      color: #0099ff;
      text-decoration: underline;
      font-weight: 900;
    }
    span {
      color: #0099ff;
      font-weight: bolder;
    }
  }
}

/* mobile 尺寸 */
@media screen and (max-width: 768px) {
  .container {
    width: 80%;
  }
}
</style>
