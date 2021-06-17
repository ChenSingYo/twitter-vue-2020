<template>
  <div class="container">
    <!-- logo bar -->
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
          autofocus
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
  data() {
    return {
      account: '',
      password: '',
      isProcessing: false
    }
  },
  methods: {
    async handleSubmit() {
      try {
        this.isProcessing = true
        if (!this.account || !this.password) {
          Toast.fire({
            icon: 'warning',
            title: '請輸入帳號與密碼 '
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
        this.$store.commit('setCurrentUser', data.user)
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
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  justify-content: center;
  margin-top: 50px;
  width: 30%;

  .header {
    margin-bottom: 30px;
    text-align: center;
  }
  .title-bar {
    margin-bottom: 20px;
    font-weight: bold;
    span {
      font-size: 23px;
    }
  }
  .form-label-group {
    position: relative;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    margin-bottom: 20px;
    height: 50px;
    border-radius: 4px;
    background: #f5f8fa;

    label {
      position: absolute;
      top: 0;
      padding: 3px 0 0 8px;
      width: 100%;
      height: 25px;
      color: var(--cement-gary-clr);
      font-size: 15px;
      cursor: text;
    }
    .form-control {
      padding: 0px 10px;
      height: 25px;
      outline-width: 0;
      border: none;
      border-bottom: 3px solid var(--cement-gary-clr);
      border-bottom-right-radius: 2px;
      border-bottom-left-radius: 2px;
      background: #f5f8fa;

      .form-bottom {
        text-align: end;
      }
    }
    .form-control:focus,
    .form-control:hover {
      border-color: var(--primary-clr);
      box-shadow: none;
    }
  }
  .button-wrapper {
    align-items: center;
    flex-flow: column;
    margin-bottom: 20px;
    padding-top: 10px;
    height: 50px;
    background: none;

    .submit-button {
      height: 50px;
      border: none;
      border-radius: 50px;
      background-color: var(--primary-clr);
      color: white;
      font-weight: 500;
    }
  }
  .form-bottom {
    text-align: end;
    .text-link {
      color: var(--link-blue-clr);
      text-decoration: underline;
      font-weight: 900;
    }
    span {
      color: var(--link-blue-clr);
      font-weight: bolder;
    }
  }
}

/* mobile 尺寸 */
@media screen and (max-width: 876px) {
  .container {
    width: 50%;
  }
}
</style>
