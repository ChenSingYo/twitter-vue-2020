<template>
  <div class="info">
    <UserHeader :name="user.name" :count="user.tweetCount" />

    <section ref="introduction" class="introduction">
      <div class="introduction-container">
        <div class="cover-img">
          <img :src="user.cover" alt="" />
        </div>
        <div class="avatar-container">
          <img :src="user.avatar" alt="" />
        </div>
        <div class="edit-container">
          <UserInfoMenu
            :initial-is-following="user.isFollowing"
            :is-current-user="isCurrentUser"
            @after-show-edit="afterShowEditHandle"
          />
        </div>
        <div class="summary-board">
          <div class="info-container">
            <div class="name">{{ user.name }}</div>
            <div class="tag">@{{ user.account }}</div>
            <p class="content">{{ user.introduction }}</p>
          </div>
          <div class="follow-container">
            <router-link to="/profile/follow" class="following">
              <span class="count"
                >{{
                  isCurrentUser
                    ? userFollowCount.following
                    : user.followingCount
                }}
                個</span
              >
              <span class="text">跟隨中</span>
            </router-link>
            <router-link to="/profile/follow" class="follower">
              <span class="count"
                >{{
                  isCurrentUser
                    ? user.followerCount
                    : otherUserFollowerCount.follower
                }}
                個</span
              >
              <span class="text">跟隨者</span>
            </router-link>
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
              @after-show-article="afterShowArticleHandle"
              @after-like-toggle="afterLikeToggleHandle"
              @after-to-profile="afterToProfileHandle"
            />
          </tab>
          <tab id="second-tab" name="推文與回覆">
            <TweetMessageCell
              v-for="reply in tweets"
              :key="reply.id"
              :tweet="reply"
              @after-show-article="afterShowArticleHandle"
              @after-like-toggle="afterLikeToggleHandle"
              @after-to-profile="afterToProfileHandle"
            />
          </tab>
          <tab id="third-tab" name="喜歡的內容">
            <template v-if="tweets">
              <TweetMessageCell
                v-for="like in tweets"
                :key="like.id"
                :tweet="like"
                @after-show-article="afterShowArticleHandle"
                @after-like-toggle="afterLikeToggleHandle"
                @after-to-profile="afterToProfileHandle"
              />
            </template>
            <div v-if="!tweets">尚未有喜歡的推文</div>
          </tab>
        </tabs>
      </div>
    </section>

    <UserInfoEditing
      :initial-current-user="user"
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
import { mapState } from 'vuex'

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
      tweets: [],
      user: {
        id: -1,
        account: '',
        name: '',
        avatar: '',
        cover: '',
        introduction: '',
        tweetCount: -1,
        followingCount: -1,
        followerCount: -1,
        isFollowing: false
      }
    }
  },
  computed: {
    ...mapState(['currentUser', 'userFollowCount', 'otherUserFollowerCount']),
    isCurrentUser() {
      const { id } = this.$route.params
      return !id
    },
    userId() {
      const { id } = this.$route.params
      // 如果 router 沒有 id params，就表示為個人資料頁面
      return id || this.currentUser.id
    }
  },
  watch: {
    $route(to, from) {
      // 路由 id 有變化時候 會 reload
      // console.log({ to, from })
      const { id } = to.params
      this.fetchUser({ userId: id || this.currentUser.id })
    }
  },
  created() {
    // console.log('create user id  :', this.userId)
    // TODO: 重整畫面 id 會是 -1 抓不到 currentUser
    this.fetchUser({ userId: this.userId })
  },
  beforeRouteUpdate(to, from, next) {
    console.log('beforeRouteUpdate')
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
      this.fetchUser({ userId: this.currentUser.id })
    },
    afterLikeToggleHandle({ id, isLiked }) {
      if (isLiked) {
        this.removeLike({ id })
      } else {
        this.addLike({ id })
      }
    },
    afterToProfileHandle({ userId }) {
      const { id } = this.$route.params
      console.log({ userId, id })

      if (parseInt(id) === parseInt(userId)) {
        return
      }

      this.$router.push({ path: `/profile/${userId}` })
    },
    afterShowArticleHandle({ id }) {
      this.$router.push(`/tweets/${id}`)
    },
    preHandleLike({ id }, isAdd) {
      this.tweets = this.tweets.map(tweet => {
        if (tweet.id === id) {
          return {
            ...tweet,
            isLiked: !!isAdd,
            likedCount: isAdd
              ? (tweet.likedCount += 1)
              : (tweet.likedCount -= 1)
          }
        } else {
          return tweet
        }
      })
    },
    async fetchUser({ userId }) {
      try {
        const { data } = await usersAPI.getUser({ userId })
        console.log('fetch user : ', data)
        this.user = data
        // 如果 current user 才會儲存跟隨狀態數值
        if (userId === this.currentUser.id) {
          this.$store.commit('setUserFollowCount', {
            id: this.user.id,
            following: this.user.followingCount
          })
        } else {
          this.$store.commit('setOtherUserFollowCount', {
            id: this.user.id,
            follower: this.user.followerCount
          })
        }
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '取得使用者錯誤，請稍後再試'
        })
      }
    },
    async fetchCurrentUserTweets({ id }) {
      this.tweets = []
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
      this.tweets = []
      try {
        const { data } = await usersAPI.getCurrentUserReplied({ id })
        this.tweets = data
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '取得使用者推文與回覆錯誤，請稍後再試'
        })
      }
    },
    async fetchCurrentUserLikes({ id }) {
      this.tweets = []
      try {
        const { data } = await usersAPI.getCurrentUserLikes({ id })
        this.tweets = data
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '取得使用者喜歡內容錯誤，請稍後再試'
        })
      }
    },
    async addLike({ id }) {
      try {
        this.preHandleLike({ id }, true)
        const { data } = await usersAPI.addLike({ id })
        console.log(data)
        if (data.status !== 'success') {
          this.preHandleLike({ id }, false)
        }
      } catch (error) {
        console.log(error)
        this.preHandleLike({ id }, false)
        Toast.fire({
          icon: 'error',
          title: '加入喜歡推文失敗，請稍後再試'
        })
      }
    },
    async removeLike({ id }) {
      try {
        this.preHandleLike({ id }, false)
        const { data } = await usersAPI.removeLike({ id })
        if (data.status !== 'success') {
          this.preHandleLike({ id }, true)
        }
        console.log(data)
      } catch (error) {
        console.log(error)
        this.preHandleLike({ id }, true)
        Toast.fire({
          icon: 'error',
          title: '移除喜歡推文失敗，請稍後再試'
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
