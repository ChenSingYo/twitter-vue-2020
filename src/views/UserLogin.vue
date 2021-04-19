<template>
  <div class="container">
    <!-- logo bar-->
    <div class="logo-bar header">
      <img src="./../img/Logo.svg" alt="logo" />
    </div>
    <!-- title bar-->
    <div class="title-bar header">
      <span>登入Alphitter</span>
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
          autocomplete="useraccount"
          required
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
          autocomplete="new-password"
          required
        />
      </div>
      <div class="form-label-group button-div">
        <button
          class="btn btn-primary btn-block submit-button"
          :disabled="isProcessing"
          type="submit"
        >
          登入
        </button>
      </div>
      <div class="form-bottom">
        <router-link class="text-secondary" to="/regist">
          註冊 Alphitter
        </router-link>
        <span class="text-muted"> · </span>
        <router-link class="text-secondary" to="/adminlogin">
          後台登入
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      account: '',
      password: '',
      isProcessing: false
    }
  },
  methods: {
    async handleSubmit () {
    }
  }
}
</script>
