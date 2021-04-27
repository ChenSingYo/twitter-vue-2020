<template>
  <div class="info">
    <UserHeader :name="currentUser.name" :count="currentUser.tweetCount" />

    <section ref="introduction" class="introduction">
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

    <section ref="ariticle" class="ariticle-tab">
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
              @after-like-toggle="afterLikeToggleHandle"
              @after-to-profile="afterToProfileHandle"
            />
          </tab>
          <tab id="second-tab" name="推文與回覆">
            <TweetMessageCell
              v-for="reply in replied"
              :key="reply.id"
              :tweet="reply"
              @after-like-toggle="afterLikeToggleHandle"
              @after-to-profile="afterToProfileHandle"
            />
          </tab>
          <tab id="third-tab" name="喜歡的內容">
            <template v-if="likes">
              <TweetMessageCell
                v-for="like in likes"
                :key="like.id"
                :tweet="like"
                @after-like-toggle="afterLikeToggleHandle"
                @after-to-profile="afterToProfileHandle"
              />
            </template>
            <div v-if="!likes">尚未有喜歡的推文</div>
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
  props: {
    userId: {
      type: [String, Number],
      require: true
    }
  },
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
      tweets: [],
      replied: [],
      likes: [],
      currentUser: {
        id: -1,
        account: '',
        name: '',
        avatar: '',
        cover: '',
        introduction: '',
        tweetCount: -1,
        followingCount: -1,
        followerCount: -1
      }
    }
  },
  watch: {
    $route(to, from) {
      // 路由 id 有變化時候 會 reload
      // console.log({ to, from })
      const { id } = to.params
      this.fetchUser({ userId: id })
    }
  },
  created() {
    this.fetchUser({ userId: this.userId })
  },
  beforeRouteUpdate(to, from, next) {
    // 頁面重新整理時會抓取 id
    // 路由改變時重新抓取資料
    const { id } = to.params
    this.fetchUser({ userId: id })
    next()
  },
  methods: {
    tabChanged(selectedTab) {
      if (selectedTab.tab.id === 'first-tab') {
        this.fetchCurrentUserTweets({ id: this.userId })
      } else if (selectedTab.tab.id === 'second-tab') {
        this.fetchCurrentUserReplied({ id: this.userId })
      } else {
        this.fetchCurrentUserLikes({ id: this.userId })
      }
    },
    afterShowEditHandle() {
      this.showPopupView = true
    },
    afterCloseHandle() {
      this.showPopupView = false
    },
    afterLikeToggleHandle() {
      console.log('點擊喜歡')
    },
    afterToProfileHandle({ userId }) {
      const { id } = this.$route.params
      console.log({ userId, id })

      if (parseInt(id) === parseInt(userId)) {
        return
      }

      this.$router.push({ path: `/profile/${userId}` })
    },
    async fetchUser({ userId }) {
      try {
        const { data } = await usersAPI.getUser({ userId })
        this.currentUser = data
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '取得使用者錯誤，請稍後再試'
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
  overflow-y: scroll;
  width: 600px;

  &::-webkit-scrollbar {
    // width: 3px;
    display: none;
  }
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
