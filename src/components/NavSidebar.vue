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
                /><span class="nav-text">首頁</span></a
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
                /><span class="nav-text">通知</span></a
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
                    isExactActive
                      ? require('../assets/icon/icon_earth_active.svg')
                      : require('../assets/icon/icon_earth.svg')
                  ]"
                  alt=""
                /><span class="nav-text">公開聊天室</span></a
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
                    isExactActive
                      ? require('../assets/icon/icon_envelope_active.svg')
                      : require('../assets/icon/icon_envelope.svg')
                  ]"
                  alt=""
                /><span class="nav-text">私人訊息</span></a
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
                /><span class="nav-text">個人資料</span></a
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
                /><span class="nav-text">設定</span></a
              >
            </router-link>
          </li>
          <li>
            <div class="post-wrapper">
              <unicon
                class="feather-icon"
                name="feather"
                fill="#fff"
                viewBox="0 0 487.38 487.38"
                width="32px"
                height="32px"
              ></unicon>
              <button class="btn post-btn" @click="showPostHandle">推文</button>
            </div>
          </li>
        </ul>
      </nav>
      <div class="logout">
        <button class="btn" @click="logout">
          <img src="../assets/icon/icon_logout.png" alt="" />
          <span class="nav-text">登出</span>
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
  position: relative;
  flex-grow: 0;
  height: 100%;
  border-right: 1px solid var(--light-gary-clr);

  .nav-wrapper {
    margin-right: 40px;

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

        .feather-icon {
          display: none;
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
      margin-left: 10px;
      height: 60px;
      .btn {
        padding: 0;
      }

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

a.router-link-exact-active,
a.router-link-active {
  color: var(--primary-clr);
}

@media only screen and (max-width: 1240px) {
  .nav-container {
    min-width: 80px;
    width: 80px;

    .nav-wrapper {
      margin: 0;

      .logo {
        margin: 0 auto;
      }

      nav {
        margin: 0;

        li {
          justify-content: center;

          .nav-text {
            display: none;
          }

          img {
            margin: 0;
          }
        }

        .post-wrapper {
          width: 50px;
          height: 50px;
          border-radius: 50%;

          .post-btn {
            display: none;
          }

          .feather-icon {
            display: block;
            text-align: center;
            line-height: 50px;
          }
        }
      }

      .logout {
        left: 50%;
        transform: translateX(-50%);

        .nav-text {
          display: none;
        }

        img {
          margin: 0;
        }
      }
    }
  }
}
</style>
