<template>
  <div class="setting-container">
    <NavSidebar />
    <UserSettingForm
      :initialUserData="userData"
      @after-submit="handleAfterSubmit"
      :isProcessing="isProcessing"
    />
  </div>
</template>

<script>
import NavSidebar from '../components/NavSidebar'
import UserSettingForm from '../components/UserSettingForm'
import usersAPI from '../apis/users'
import { Toast } from '../utils/helpers'
import { mapState } from 'vuex'

export default {
  name: 'UserAccountSetting',
  components: {
    NavSidebar,
    UserSettingForm
  },
  data() {
    return {
      userData: {
        id: -1,
        account: '',
        name: '',
        email: '',
        password: '',
        checkPassword: ''
      },
      isProcessing: false
    }
  },
  created() {
    this.fetchUserData()
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    async fetchUserData() {
      try {
        this.userData = {
          ...this.userData,
          id: this.currentUser.id,
          account: this.currentUser.account,
          name: this.currentUser.name,
          email: this.currentUser.email
        }
        console.log('userData', this.userData)
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: `無法取得使用者資訊：${err.message}`
        })
      }
    },
    async handleAfterSubmit({ account, name, email, password, checkPassword }) {
      try {
        this.isProcessing = true
        const payLoad = {
          account,
          name,
          email,
          password,
          checkPassword
        }
        const userId = this.userData.id

        console.log(userId, payLoad)
        this.isProcessing = true
        const { data } = await usersAPI.editAccount(userId, { ...payLoad })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.$store.commit('setCurrentUser', {
          userId,
          account,
          name,
          email
        })

        Toast.fire({
          icon: 'success',
          title: `更新完成：${data.message}`
        })
        this.isProcessing = false
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: `無法更新用戶資訊: ${err.message}`
        })
      }
      this.isProcessing = false
    }
  }
}
</script>

<style lang="scss" scoped>
.setting-container {
  padding: 0rem 2rem;
  display: flex;
  flex-direction: row;
  height: 100%;
}
</style>
