<template>
  <div class="nav-container">
    <div class="nav-wrapper">
      <div class="logo">
        <img src="../assets/icon/Icon.png" alt="" />
      </div>
      <nav>
        <ul>
          <li>
            <router-link to="/"
              ><img src="../assets/icon/icon_home.png" alt="" />
              首頁</router-link
            >
          </li>
          <li>
            <router-link :to="{ name: 'user-profile' }"
              ><img
                src="../assets/icon/icon_user.png"
                alt=""
              />個人資料</router-link
            >
          </li>
          <li>
            <router-link :to="{ name: 'setting' }"
              ><img
                src="../assets/icon/icon_setting.png"
                alt=""
              />設定</router-link
            >
          </li>
          <li>
            <div class="post-wrapper">
              <router-link to="/">推文</router-link>
            </div>
          </li>
        </ul>
      </nav>
      <div class="logout">
        <router-link to="/"
          ><img src="../assets/icon/icon_logout.png" alt="" />登出</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NavSiderBar',
  }
</script>

<style lang="scss" scoped>
  .nav-container {
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
          a {
            color: white;
            line-height: 45px;
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
      }
    }
  }

  a {
    color: var(--black-clr);
    font-weight: 700;
  }
</style>
