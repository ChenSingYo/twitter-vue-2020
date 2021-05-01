<template>
  <div class="nav-container">
    <div class="nav-wrapper">
      <div class="logo">
        <img src="../assets/icon/Icon.png" alt="" />
      </div>
      <nav>
        <ul>
          <li>
            <router-link
              to="/tweets"
              custom
              v-slot="{ href, navigate, isActive, isExactActive }"
            >
              <a
                :class="[
                  isActive && 'router-link-active',
                  isExactActive && 'router-link-exact-active'
                ]"
                :href="href"
                @click="navigate"
                ><img
                  :src="[
                    isActive
                      ? require('../assets/icon/icon_home_active.png')
                      : require('../assets/icon/icon_home.png')
                  ]"
                  alt=""
                />首頁</a
              ></router-link
            >
          </li>
          <li>
            <router-link
              to="/notification"
              custom
              v-slot="{ href, navigate, isActive, isExactActive }"
            >
              <a
                :class="[
                  isActive && 'router-link-active',
                  isExactActive && 'router-link-exact-active'
                ]"
                :href="href"
                @click="navigate"
                ><img
                  :src="[
                    isActive
                      ? require('../assets/icon/icon_bell_active.svg')
                      : require('../assets/icon/icon_bell.svg')
                  ]"
                  alt=""
                />通知</a
              ></router-link
            >
          </li>
          <li>
            <router-link
              to="/chatroom"
              custom
              v-slot="{ href, navigate, isActive, isExactActive }"
            >
              <a
                :class="[
                  isActive && 'router-link-active',
                  isExactActive && 'router-link-exact-active'
                ]"
                :href="href"
                @click="navigate"
                ><img
                  :src="[
                    isActive
                      ? require('../assets/icon/icon_envelope_active.svg')
                      : require('../assets/icon/icon_envelope.svg')
                  ]"
                  alt=""
                />公開聊天室</a
              ></router-link
            >
          </li>
          <li>
            <router-link
              :to="{ name: 'private-chatroom' }"
              custom
              v-slot="{ href, navigate, isActive, isExactActive }"
            >
              <a
                :class="[
                  isActive && 'router-link-active',
                  isExactActive && 'router-link-exact-active'
                ]"
                :href="href"
                @click="navigate"
                ><img
                  :src="[
                    isActive
                      ? require('../assets/icon/icon_envelope_active.svg')
                      : require('../assets/icon/icon_envelope.svg')
                  ]"
                  alt=""
                />私人訊息</a
              ></router-link
            >
          </li>
          <li>
            <router-link
              :to="{ name: 'user-profile' }"
              custom
              v-slot="{ href, navigate, isActive, isExactActive }"
            >
              <a
                :class="[
                  isActive && 'router-link-active',
                  isExactActive && 'router-link-exact-active'
                ]"
                :href="href"
                @click="navigate"
                ><img
                  :src="[
                    isActive
                      ? require('../assets/icon/icon_user_active.png')
                      : require('../assets/icon/icon_user.png')
                  ]"
                  alt=""
                />個人資料</a
              >
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'setting' }"
              custom
              v-slot="{ href, navigate, isActive, isExactActive }"
            >
              <a
                :class="[
                  isActive && 'router-link-active',
                  isExactActive && 'router-link-exact-active'
                ]"
                :href="href"
                @click="navigate"
                ><img
                  :src="[
                    isActive
                      ? require('../assets/icon/icon_setting_active.png')
                      : require('../assets/icon/icon_setting.png')
                  ]"
                  alt=""
                />設定</a
              >
            </router-link>
          </li>
          <li>
            <div class="post-wrapper">
              <button class="btn post-btn" @click="showPostHandle">推文</button>
            </div>
          </li>
        </ul>
      </nav>
      <div class="logout">
        <button class="btn" @click="logout">
          <img src="../assets/icon/icon_logout.png" alt="" />
          <span>登出</span>
        </button>
      </div>
    </div>

    <UserPostPopup :show-popup-view="showPostView" @after-close="handleClose" />
  </div>
</template>

<script>
import UserPostPopup from '../components/UserPostPopup'

export default {
  name: 'NavSiderBar',
  components: {
    UserPostPopup
  },
  data() {
    return {
      showPostView: false
    }
  },
  methods: {
    showPostHandle() {
      this.showPostView = true
    },
    handleClose() {
      this.showPostView = false
    },
    logout() {
      console.log('logout')
      this.$store.commit('revokeCurrentUser')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-container {
  flex-grow: 0;
  min-width: 378px;
  max-width: 378px;
  width: 378px;
  height: 100%;
  border-right: 1px solid var(--light-gary-clr);

  .nav-wrapper {
    margin-left: 103px;

    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      margin-top: 4px;
      width: 50px;
      height: 50px;

      img {
        width: 30px;
        height: 30px;
      }
    }

    nav {
      margin-left: 10px;

      .post-wrapper {
        width: 210px;
        height: 45px;
        border-radius: 22.5px;
        background-color: var(--primary-clr);
        text-align: center;
        cursor: pointer;
        .post-btn {
          padding: 0;
          width: 100%;
          height: 100%;
          color: white;
          line-height: 45px;
        }

        .btn {
          box-shadow: none;
        }
      }

      li {
        display: flex;
        align-items: center;
        height: 60px;
      }

      img {
        margin-right: 20px;
        width: 24px;
        height: 24px;
      }
    }

    .logout {
      position: absolute;
      bottom: 0;
      display: flex;
      align-items: center;
      height: 60px;

      img {
        margin-right: 20px;
        width: 24px;
        height: 24px;
      }

      span {
        font-weight: bold;
      }
    }
  }
}

a {
  color: var(--black-clr);
  font-weight: 700;
  cursor: pointer;
}

a.router-link-exact-active {
  color: var(--primary-clr);
}
</style>
