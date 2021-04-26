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
              to="/admin/tweets"
              custom
              v-slot="{ navigate, isActive, isExactActive }"
            >
              <a
                :class="[
                  isActive && 'router-link-active',
                  isExactActive && 'router-link-exact-active'
                ]"
                @click="navigate"
                ><img
                  :src="[
                    isActive
                      ? require('../assets/icon/icon_home_active.png')
                      : require('../assets/icon/icon_home.png')
                  ]"
                  alt=""
                /><span>推文清單</span></a
              ></router-link
            >
          </li>
          <li>
            <router-link
              :to="{ name: 'admin-users' }"
              custom
              v-slot="{ navigate, isActive, isExactActive }"
            >
              <a
                :class="[
                  isActive && 'router-link-active',
                  isExactActive && 'router-link-exact-active'
                ]"
                @click="navigate"
                ><img
                  :src="[
                    isActive
                      ? require('../assets/icon/icon_user_active.png')
                      : require('../assets/icon/icon_user.png')
                  ]"
                  alt=""
                /><span>使用者列表</span></a
              >
            </router-link>
          </li>
        </ul>
      </nav>
      <div class="logout">
        <button
          class="btn"
          @click="logout"
        >
          <img src="../assets/icon/icon_logout.png" alt="" />
          <span>登出</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminSiderBar',
  data () {
    return {
      isActive: false
    }
  },
  methods: {
    logout () {
      this.$store.commit('revokeCurrentUser')
      this.$router.push('/admin')
    }
  }
}
</script>

<style lang="scss" scoped>

.nav-container {
  width: 26.2%;
  height: 100%;
  border-right: 1px solid var(--light-gary-clr);

  .nav-wrapper {
    margin-left: 27.2%;

    .logo {
      display: flex;
      align-items: center;
      justify-content: left;
      margin-top: 4px;
      width: 50px;
      height: 50px;

      img {
        width: 30px;
        height: 30px;
      }
    }

    nav {
      margin-top: 1rem;

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

a.router-link-active {
  color: var(--primary-clr);
}

/* for mobile */
@media screen and (max-width: 768px) {
  .nav-container {
    .nav-wrapper {
      display: flex;
      justify-content: space-between;
      margin-left: 10px;
      nav {
        li {
          display: inline;
          margin-right: 20px;
        }
        img {
          margin-right: 6px;
        }
      }
      .logout {
        padding-bottom: 8px;
        position: relative;
        span {
          display: none;
        }
      }
    }
  }
}

@media screen and (max-width: 375px) {
  .nav-container {
    span {
      display: none;
    }
  }
}
</style>
