<template>
  <div class="info">
    <UserHeader :name="currentUser.name" :count="currentUser.tweetCount" />

    <section class="introduction">
      <div class="introduction-container">
        <div class="cover-img">
          <img :src="currentUser.cover" alt="" />
        </div>
        <div class="avatar-container">
          <img :src="currentUser.avatar" alt="" />
        </div>
        <div class="edit-container">
          <UserInfoMenu
            :is-current-user="true"
            @after-show-edit="afterShowEditHandle"
          />
        </div>
        <div class="summary-board">
          <div class="info-container">
            <div class="name">{{ currentUser.name }}</div>
            <div class="tag">{{ currentUser.account }}</div>
            <p class="content">{{ currentUser.introduction }}</p>
          </div>
          <div class="follow-container">
            <router-link to="/profile/follow" class="following">
              <span class="count">{{ currentUser.followingCount }} 個</span>
              <span class="text">跟隨中</span>
            </router-link>
            <div class="follower">
              <span class="count">{{ currentUser.followerCount }} 個</span>
              <span class="text">跟隨者</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="ariticle-tab">
      <div class="tab-container">
        <tabs
          :options="{ defaultTabHash: 'first-tab', useUrlFragment: false }"
          @changed="tabChanged"
        >
          <tab id="first-tab" name="推文">
            <TweetMessageCell
              v-for="tweet in tweets"
              :key="tweet.id"
              :tweet="tweet"
            />
          </tab>
          <tab id="second-tab" name="推文與回覆">
            <TweetMessageCell />
          </tab>
          <tab id="third-tab" name="喜歡的內容">
            <TweetMessageCell />
          </tab>
        </tabs>
      </div>
    </section>

    <UserInfoEditing
      :initial-current-user="currentUser"
      :show-popup-view="showPopupView"
      @after-close="afterCloseHandle"
    />
  </div>
</template>

<script>
import { Tabs, Tab } from 'vue-tabs-component'
import TweetMessageCell from '../components/TweetMessageCell'
import UserInfoEditing from '../components/UserInfoEditing'
import UserHeader from '../components/UserHeader'
import UserInfoMenu from '../components/UserInfoMenu'
import usersAPI from '../apis/users'
import { Toast } from '../utils/helpers'

export default {
  name: 'UserInfo',
  components: {
    Tabs,
    Tab,
    TweetMessageCell,
    UserInfoEditing,
    UserHeader,
    UserInfoMenu
  },
  data() {
    return {
      showPopupView: false,
      currentUser: {
        id: -1,
        account: '',
        name: '',
        avatar: '',
        cover: '',
        tweetCount: -1,
        followingCount: -1,
        followerCount: -1,
        introduction: ''
      },
      tweets: [],
      replied: [],
      likes: []
    }
  },
  created() {
    // TODO: 要使用 currentUser id
    this.fetchCurrentUser({ id: 2 })
  },
  methods: {
    tabChanged(selectedTab) {
      // TODO: 要使用 currentUser id
      if (selectedTab.tab.id === 'first-tab') {
        this.fetchCurrentUserTweets({ id: 2 })
      } else if (selectedTab.tab.id === 'second-tab') {
        this.fetchCurrentUserReplied({ id: 2 })
      } else {
        this.fetchCurrentUserLikes({ id: 2 })
      }
    },
    afterShowEditHandle() {
      this.showPopupView = true
    },
    afterCloseHandle() {
      this.showPopupView = false
    },
    async fetchCurrentUser({ id }) {
      try {
        const { data } = await usersAPI.getCurrentUser({ id })
        this.currentUser = data
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '取得使用者資料錯誤，請稍後再試'
        })
      }
    },
    async fetchCurrentUserTweets({ id }) {
      try {
        const { data } = await usersAPI.getCurrentUserTweets({ id })
        this.tweets = data
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '取得使用者推文錯誤，請稍後再試'
        })
      }
    },
    async fetchCurrentUserReplied({ id }) {
      try {
        const { data } = await usersAPI.getCurrentUserReplied({ id })
        this.replied = data
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '取得使用者推文與回覆錯誤，請稍後再試'
        })
      }
    },
    async fetchCurrentUserLikes({ id }) {
      try {
        const { data } = await usersAPI.getCurrentUserLikes({ id })
        this.likes = data
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '取得使用者喜歡內容錯誤，請稍後再試'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin name-style {
  color: var(--black-clr);
  font-weight: 900;
  font-size: 1.187rem;
}

.info {
  width: 600px;
}

.introduction-container {
  position: relative;

  .cover-img {
    position: relative;
    z-index: -10;
    overflow: hidden;
    height: 200px;
    background-color: var(--water-gary-clr);

    img {
      width: 100%;
      height: 100%;
    }
  }

  .avatar-container {
    overflow: hidden;
    margin-top: -70px;
    margin-left: 15px;
    width: 140px;
    height: 140px;
    border: 4px solid #fff;
    border-radius: 50%;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .edit-container {
    position: absolute;
    top: 200px; // cover 圖片高度
    right: 0;
    margin: 10px 15px;
  }

  .summary-board {
    padding: 5px 15px;

    .info-container {
      .name {
        @include name-style;
      }
      .tag {
        color: var(--cement-gary-clr);
        font-weight: 500;
        font-size: 15px;
        line-height: 22px;
      }
      .content {
        margin-top: 10px;
        color: var(--black-clr);
        font-weight: 400;
        font-size: 0.875rem;
      }
    }

    .follow-container {
      display: flex;
      margin-top: 10px;

      .following,
      .follower {
        display: flex;
        cursor: pointer;

        &:last-child {
          margin-left: 20px;
        }

        .count,
        .text {
          font-weight: 500;
          font-size: 0.875rem;
        }
        .count {
          color: var(--black-clr);
        }

        .text {
          color: var(--cement-gary-clr);
        }
      }
    }
  }
}

::v-deep .ariticle-tab {
  margin-top: 20px;
  height: 54px;
  .tab-container {
    height: 100%;
  }

  .tabs-component {
    height: 100%;
    border-bottom: 1px solid var(--light-gary-clr);
    .tabs-component-tabs {
      display: flex;
      margin-bottom: 0;
      height: 100%;

      .tabs-component-tab {
        width: 130px;
        height: 100%;
        text-align: center;

        &.is-active {
          border-bottom: 2px solid var(--primary-clr);
          .tabs-component-tab-a {
            color: var(--primary-clr);
          }
        }

        .tabs-component-tab-a {
          color: var(--cement-gary-clr);
          font-weight: 500;
          font-size: 15px;
          line-height: 54px;
        }
      }
    }
  }
}
</style>
