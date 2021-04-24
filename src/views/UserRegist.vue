<template>
  <div class="container">
    <!-- logo bar-->
    <div class="logo-bar header">
      <img src="../assets/icon/Icon.png" alt="logo" />
    </div>
    <!-- title bar-->
    <div class="title-bar header">
      <span>建立你的帳號</span>
    </div>
    <form @submit.prevent.stop="handleSubmit">
      <!-- 帳號 -->
      <div class="form-label-group">
        <label for="account">帳號</label>
        <input
          v-model="account"
          id="account"
          ref="account"
          name="account"
          type="text"
          class="form-control"
          required
        />
      </div>
      <!-- 名稱 -->
      <div class="form-label-group">
        <label for="name">名稱</label>
        <input
          v-model="name"
          id="name"
          ref="name"
          name="name"
          type="text"
          class="form-control"
          required
        />
      </div>
      <!-- email -->
      <div class="form-label-group">
        <label for="email">Email</label>
        <input
          v-model="email"
          id="email"
          ref="email"
          type="email"
          name="email"
          class="form-control"
          required
        />
      </div>
      <!-- 密碼 -->
      <div class="form-label-group">
        <label for="password">密碼</label>
        <input
          v-model="password"
          id="password"
          ref="password"
          name="password"
          type="password"
          class="form-control"
          required
        />
      </div>
      <!-- 密碼確認 -->
      <div class="form-label-group">
        <label for="confirm-password">密碼確認</label>
        <input
          v-model="confirmPassword"
          id="confirm-password"
          ref="confirmPassword"
          name="confirmPassword"
          type="password"
          class="form-control"
          required
        />
      </div>
      <div class="form-label-group button-wrapper">
        <button
          class="btn btn-primary btn-block submit-button"
          :disabled="isProcessing"
          type="submit"
        >
          註冊
        </button>
        <router-link class="" v-show="!isProcessing" to="/login">
          取消
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import usersAPI from './../apis/users'
import { Toast } from './../utils/helpers'

export default {
  name: 'Regist',
  data () {
    return {
      account: '',
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      isProcessing: false
    }
  },
  methods: {
    async handleSubmit (e) {
      try {
        this.isProcessing = true
        const formData = new FormData(e.target)

        for (const [name, value] of formData.entries()) {
          console.log(name + ': ' + value)
        }

        const { data } = await usersAPI.signUp({
          account: this.account,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword,
          name: this.name
        })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.$router.push('/login')
      } catch (err) {
        this.isProcessing = false
        Toast.fire({
          icon: 'warning',
          title: `帳號密碼有誤: ${err.message}`
        })
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
    img {
      width: 40px;
    }
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
      font-size: 0.8rem;
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
    }
    .form-control:hover,
    .form-control:focus {
      box-shadow: none;
      border-color: #ff6600;
    }
  }
  .button-wrapper {
    size: 18px;
    position: relative;
    background: none;
    align-items: center;

    .submit-button {
      font-weight: 500;
      height: 50px;
      border-radius: 50px;
      top: 10px;
      position: absolute;
      border: none;
      color: white;
      background-color: #ff6600;
    }
  }
  .button-wrapper :last-child {
    top: 75px;
    position: absolute;
    color: #0099ff;
    font-weight: bold;
    text-decoration: underline;
  }
}

/* mobile 尺寸 */
@media screen and (max-width: 768px) {
  .container {
    width: 80%;
  }
}
</style>
