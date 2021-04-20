<template>
  <div class="container">
    <!-- logo bar-->
    <div class="logo-bar header">
      <img src="../assets/icon/Icon.png" alt="logo">
    </div>
    <!-- title bar-->
    <div class="title-bar header">
      <span>建立你的帳號</span>
    </div>
    <form @submit.prevent.stop="handleFormSubmit">
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
          autofocus
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
          autocomplete="username"
        />
      </div>
      <!-- email -->
      <div class="form-label-group">
        <label for="email">Email</label>
        <input
          v-model="email"
          id="email"
          ref="email"
          name="email"
          type="email"
          class="form-control"
          autocomplete="useremail"
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
          autocomplete="new-password"
        />
      </div>
      <!-- 密碼確認 -->
      <div class="form-label-group">
        <label for="check-password">密碼確認</label>
        <input
          v-model="checkPassword"
          id="check-password"
          ref="checkPassword"
          name="checkPassword"
          type="password"
          class="form-control"
          autocomplete="new-password"
        />
      </div>
      <div class="form-label-group button-div">
        <button class="btn btn-primary btn-block submit-button" :disabled="isProcessing" type="submit">
          註冊
        </button>
        <router-link class="text-secondary" v-show="!isProcessing" to="/signin">
          取消
        </router-link>
      </div>
    </form>
  </div>
</template>
