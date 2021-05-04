<template>
  <div class="info">
    <UserHeader
      class="user-header"
      :name="user.name"
      :count="user.tweetCount"
    />

    <Spinner v-if="isLoadingProfile" />
    <section v-else class="introduction">
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
            @after-send-message="afterSendMessageHandle"
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

    <section class="ariticle-tab">
      <div class="tab-container">
        <tabs
          :options="{ defaultTabHash: 'first-tab', useUrlFragment: false }"
          @changed="tabChanged"
        >
          <tab id="first-tab" name="推文">
            <template v-if="isLoadingTweets">
              <Spinner />
            </template>
            <template v-else-if="tweets.length">
              <TweetMessageCell
                v-for="tweet in tweets"
                :key="tweet.id"
                :tweet="tweet"
                @after-reply-message="afterReplyHandle"
                @after-show-article="afterShowArticleHandle"
                @after-like-toggle="afterLikeToggleHandle"
                @after-to-profile="afterToProfileHandle"
              />
            </template>
            <template v-else>
              <div class="empty-text">尚未發布任何推文</div>
            </template>
          </tab>
          <tab id="second-tab" name="推文與回覆">
            <template v-if="isLoadingTweets">
              <Spinner />
            </template>
            <template v-else-if="tweets.length">
              <TweetMessageCell
                v-for="reply in tweets"
                :key="reply.id"
                :tweet="reply"
                @after-reply-message="afterReplyHandle"
                @after-show-article="afterShowArticleHandle"
                @after-like-toggle="afterLikeToggleHandle"
                @after-to-profile="afterToProfileHandle"
              />
            </template>
            <template v-else>
              <div class="empty-text">尚未推文與回覆</div>
            </template>
          </tab>
          <tab id="third-tab" name="喜歡的內容">
            <template v-if="isLoadingTweets">
              <Spinner />
            </template>
            <template v-else-if="tweets.length">
              <TweetMessageCell
                v-for="like in tweets"
                :key="like.id"
                :tweet="like"
                @after-reply-message="afterReplyHandle"
                @after-show-article="afterShowArticleHandle"
                @after-like-toggle="afterLikeToggleHandle"
                @after-to-profile="afterToProfileHandle"
              />
            </template>
            <template v-else>
              <div class="empty-text">尚未有喜歡的推文</div>
            </template>
          </tab>
        </tabs>
      </div>
    </section>

    <ReplyTweetPopup
      :show-popup-view="showReplyPopup"
      :tweet="replyTweet"
      :current-user="currentUser"
      @after-close="handleClose"
      @after-update-replies="afterUpdateReplies"
    />

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
import ReplyTweetPopup from '../components/ReplyTweetPopup'
import UserHeader from '../components/UserHeader'
import UserInfoMenu from '../components/UserInfoMenu'
import usersAPI from '../apis/users'
import { Toast } from '../utils/helpers'
import { mapState } from 'vuex'
import Spinner from '../components/Spinner'

export default {
  name: 'UserInfo',
  components: {
    Tabs,
    Tab,
    TweetMessageCell,
    UserInfoEditing,
    UserHeader,
    UserInfoMenu,
    ReplyTweetPopup,
    Spinner
  },
  data() {
    return {
      showPopupView: false,
      showReplyPopup: false,
      tweets: [],
      tabSelectedIndex: '',
      isLoadingProfile: false,
      isLoadingTweets: false,
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
      },
      replyTweet: {
        id: -1,
        UserId: -1,
        description: '',
        createdAt: '',
        updatedAt: '',
        likedCount: -1,
        repliedCount: -1,
        isLiked: false,
        user: {
          avatar: '',
          name: '',
          account: ''
        }
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
      this.tabSelectedIndex = selectedTab.tab.id
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

      if (parseInt(id) === parseInt(userId)) {
        return
      }

      this.$router.push({ path: `/profile/${userId}` })
    },
    afterShowArticleHandle({ id }) {
      this.$router.push(`/tweets/${id}`)
    },
    afterSendMessageHandle() {
      this.$store.commit('setConnectingUser', {
        UserId: this.user.id,
        username: this.user.name,
        account: this.user.account,
        avatar: this.user.avatar
      })
      this.$router.push({ name: 'private-chatroom' })
    },
    afterReplyHandle({ tweet }) {
      this.replyTweet = tweet
      this.showReplyPopup = true
    },
    handleClose() {
      this.showReplyPopup = false
    },
    // 回覆單一推文 更新資料畫面
    afterUpdateReplies() {
      if (this.tabSelectedIndex === 'first-tab') {
        this.fetchCurrentUserTweets({ id: this.userId })
      } else if (this.tabSelectedIndex === 'second-tab') {
        this.fetchCurrentUserReplied({ id: this.userId })
      } else {
        this.fetchCurrentUserLikes({ id: this.userId })
      }
      this.showReplyPopup = false
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
      this.isLoadingProfile = true
      try {
        const { data } = await usersAPI.getUser({ userId })
        // console.log('fetch user : ', data)
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
        this.isLoadingProfile = false
      } catch (error) {
        this.isLoadingProfile = false
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '取得使用者錯誤，請稍後再試'
        })
      }
    },
    async fetchCurrentUserTweets({ id }) {
      this.isLoadingTweets = true
      this.tweets = []
      try {
        const { data } = await usersAPI.getCurrentUserTweets({ id })
        this.tweets = data
        this.isLoadingTweets = false
      } catch (error) {
        console.log(error)
        this.isLoadingTweets = false
        Toast.fire({
          icon: 'error',
          title: '取得使用者推文錯誤，請稍後再試'
        })
      }
    },
    async fetchCurrentUserReplied({ id }) {
      this.isLoadingTweets = true
      this.tweets = []
      try {
        const { data } = await usersAPI.getCurrentUserReplied({ id })
        this.tweets = data
        this.isLoadingTweets = false
      } catch (error) {
        console.log(error)
        this.isLoadingTweets = false
        Toast.fire({
          icon: 'error',
          title: '取得使用者推文與回覆錯誤，請稍後再試'
        })
      }
    },
    async fetchCurrentUserLikes({ id }) {
      this.isLoadingTweets = true
      this.tweets = []
      try {
        const { data } = await usersAPI.getCurrentUserLikes({ id })
        this.tweets = data
        this.isLoadingTweets = false
      } catch (error) {
        console.log(error)
        this.isLoadingTweets = false
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

.user-header {
  position: sticky;
  top: 0;
  z-index: 888;
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

.empty-text {
  margin-top: 20px;
  color: var(--cement-gary-clr);
  text-align: center;
  font-weight: 500;
  font-size: 16px;
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
