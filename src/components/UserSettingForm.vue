<template>
  <div class="setting">
    <Header title="帳戶設定" />
    <div class="setting-container">
      <form @submit.prevent.stop="handleSubmit">
        <div class="input-wrapper">
          <label class="text">帳號</label>
          <input
            type="text"
            v-model="userData.account"
            autofocus
          />
        </div>
        <div class="input-wrapper">
          <label class="text">名稱</label>
          <input
            type="text"
            v-model="userData.name"
          />
        </div>
        <div class="input-wrapper">
          <label class="text">Email</label>
          <input
            type="text"
            v-model="userData.email"
          />
        </div>
        <div class="input-wrapper">
          <label class="text">密碼</label>
          <input
            type="password"
            v-model="userData.password"
          />
        </div>
        <div class="input-wrapper">
          <label class="text">密碼確認</label>
          <input
            type="password"
            v-model="userData.checkPassword"
          />
        </div>
        <div class="btn-wrapper">
          <button
            class="btn"
            type="submit"
            :disabled="isProcessing"
          >儲存
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'
import { Toast } from '../utils/helpers'

export default {
  name: 'UserSettingForm',
  components: {
    Header
  },
  props: {
    initialUserData: {
      type: Object,
      default: () => ({
        id: -1,
        account: '',
        name: '',
        email: '',
        password: '',
        checkPassword: ''
      })
    },
    isProcessing: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      userData: {
        ...this.initialUserData,
      }
    }
  },
  watch: {
    initialUserData(newValue) {
      this.userData = {
        ...this.userData,
        ...newValue
      }
    }
  },
  methods: {
    handleSubmit () {
      if (this.userData.checkPassword !== this.userData.password) {
        Toast.fire({
          icon: 'warning',
          title: '請確認密碼欄位相同'
        })
        this.userData.checkPassword = ''
        this.userData.password = ''
        return
      }

      this.$emit('after-submit', {
        account: this.userData.account,
        name: this.userData.name,
        email: this.userData.email,
        password: this.userData.password,
        checkPassword: this.userData.checkPassword
      })
     }
  }
}
</script>

<style lang="scss" scoped>
.setting {
  flex-grow: 1;
}

.setting-container {
  margin-left: 16px;
  width: 642px;
}

.input-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 30px 0;
  border-radius: 4px;
  background-color: var(--water-gary-clr);

  label {
    margin-bottom: 0;
    padding: 5px 15px;
    color: var(--cement-gary-clr);
    font-weight: 500;
    font-size: 0.937rem;
  }

  input {
    padding: 0 15px;
    height: 24px;
    border: 0;
    border-bottom: 3px solid var(--cement-gary-clr);
    border-bottom-right-radius: 2px;
    border-bottom-left-radius: 2px;
    border-radius: 0px 0px 4px 4px;
    background-color: transparent;
    color: var(--black-clr);
    font-weight: 500;
    font-size: 19;
    &:focus,
    &:hover {
      outline: 0;
      border-color: var(--primary-clr);
    }
  }
}

.btn-wrapper {
  margin-top: 30px;
  text-align: right;

  button {
    padding: 0;
    width: 122px;
    height: 50px;
    border-radius: 25px;
    background-color: var(--primary-clr);
    color: #fff;
    line-height: 0;
  }
}

.btn:focus {
  box-shadow: none;
}
</style>
