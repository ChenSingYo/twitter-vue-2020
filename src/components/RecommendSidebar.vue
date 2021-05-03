<template>
  <div class="recommend">
    <div class="recommend-container">
      <div class="recommend-card">
        <header class="title">
          跟隨誰
        </header>
        <ul>
          <li
            v-for="topUser in showUsers"
            :key="topUser.id"
            class="card-container"
          >
            <router-link
              :to="{ name: 'other-profile', params: { id: topUser.id } }"
            >
              <img
                class="avatar"
                :src="topUser.avatar | emptyImage"
                alt="avatar"
              />
            </router-link>
            <div class="user-info-container">
              <div class="user-name">{{ topUser.name }}</div>
              <div class="user-tag">@{{ topUser.account }}</div>
            </div>
            <div class="follow-btn-container">
              <button
                class="follow-btn"
                :class="{ following: topUser.isFollowing }"
                @click="followToggleHandle(topUser)"
              >
                {{ topUser.isFollowing ? '正在跟隨' : '跟隨' }}
              </button>
            </div>
          </li>
        </ul>
        <footer class="more-footer">
          <template>
            <button class="btn more-btn" @click.prevent.stop="toggleShowUsers">
              {{ this.isShowMore ? '顯示較多' : '顯示較少' }}
            </button>
          </template>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import usersAPI from './../apis/users'
import followAPI from './../apis/follow'
import { Toast } from './../utils/helpers'
import { emptyImageFilter } from './../utils/mixins'
import { mapState } from 'vuex'

export default {
  mixins: [emptyImageFilter],
  name: 'RecommendSideBar',
  data() {
    return {
      topUsers: [],
      showUsers: [],
      isShowMore: false
    }
  },
  computed: {
    ...mapState(['currentUser', 'otherUserFollowerCount'])
  },
  created() {
    this.fetchUsers()
  },
  watch: {
    showUsers(data) {
      this.showUsers = data
    }
  },
  methods: {
    async fetchUsers() {
      try {
        const { data } = await usersAPI.getTopUsers()
        this.topUsers = data
        this.topUsers = this.topUsers.filter(
          user => user.id !== this.currentUser.id
        )
        this.toggleShowUsers()
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: `無法取得推薦名單:${err.message}`
        })
      }
    },
    followToggleHandle(topUser) {
      const { id } = topUser
      if (topUser.isFollowing) {
        this.removeFollow({ id })
      } else {
        this.addFollow({ id })
      }
    },
    async addFollow({ id }) {
      try {
        const { data } = await followAPI.addFollowing({ id })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.showUsers = this.showUsers.map(user => {
          if (user.id === id) {
            return {
              ...user,
              isFollowing: true
            }
          }
          return user
        })
        // current user following count add one
        this.$store.commit('setUserFollowingCount', +1)

        // other user follower count add one
        if (this.otherUserFollowerCount.id === id) {
          this.$store.commit('setOtherUserFollowerCount', +1)
        }

        Toast.fire({
          icon: 'success',
          title: '已跟隨該使用者'
        })
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: `無法跟隨使用者：${err.message}`
        })
      }
    },
    async removeFollow({ id }) {
      try {
        const { data } = await followAPI.removeFollowing({ id })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.showUsers = this.showUsers.map(user => {
          if (user.id === id) {
            return {
              ...user,
              isFollowing: false
            }
          }
          return user
        })
        // current user following count subtract one
        this.$store.commit('setUserFollowingCount', -1)

        // other user follower count subtract one
        if (this.otherUserFollowerCount.id === id) {
          this.$store.commit('setOtherUserFollowerCount', -1)
        }

        Toast.fire({
          icon: 'success',
          title: '已移除跟隨該使用者'
        })
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: `無法取消跟隨：${err.message}`
        })
      }
    },
    toggleShowUsers() {
      this.showUsers = []
      if (this.isShowMore) {
        this.showUsers = this.topUsers
      } else {
        const showUsersLength = Math.ceil(this.topUsers.length / 2)
        for (let i = 0; i < showUsersLength; i++) {
          this.showUsers.push(this.topUsers[i])
        }
      }
      this.isShowMore = !this.isShowMore
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin font-style {
  font-weight: 700;
  font-size: 15px;
}

$border-style: 1px solid var(--light-gary-clr);

.recommend {
  flex-grow: 0;
  min-width: 462px;
  min-width: 462px;
  width: 462px;
  border-left: $border-style;
}
.recommend-container {
  .recommend-card {
    margin-top: 15px;
    margin-left: 30px;
    width: 350px;
    border-radius: 14px;
    background-color: var(--water-gary-clr);

    .title {
      padding: 10px 15px 8px;
      border-bottom: $border-style;
      font-weight: 700;
      font-size: 1.125rem;
    }

    .card-container {
      display: flex;
      justify-content: space-between;
      padding: 10px 15px;

      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: lightgray;
      }

      .user-info-container {
        flex-grow: 1;
        margin: 0 10px;

        .user-name {
          @include font-style;
        }

        .user-tag {
          color: var(--cement-gary-clr);

          @include font-style;
        }
      }

      .follow-btn-container {
        display: flex;
        align-items: center;
        .follow-btn {
          padding: 0;
          padding: 8px 16px;
          height: 30px;
          border: 1px solid var(--primary-clr);
          border-radius: 15px;
          background-color: var(--water-gary-clr);
          color: var(--primary-clr);
          font-weight: bold;
          font-size: 15px;
          line-height: 0px;

          &:focus {
            box-shadow: none;
          }
          &.following {
            background-color: var(--primary-clr);
            color: #fff;
          }
        }
      }
    }

    .more-footer {
      padding: 10px 15px 8px;
      border-top: $border-style;

      .more-btn {
        padding: 0;
        color: var(--primary-clr);

        &:focus {
          box-shadow: none;
        }
      }
    }

    .more-footer {
      padding: 10px 15px 8px;
      border-top: $border-style;

      .more-btn {
        padding: 0;
        color: var(--primary-clr);
      }
    }
  }
}
</style>
