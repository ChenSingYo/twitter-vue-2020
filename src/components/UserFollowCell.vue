<template>
  <div class="cell">
    <div class="cell-container">
      <img
        class="avatar"
        :src="follow.avatar"
        @click.stop.prevent="toProfileHandle"
      />
      <div class="info-container">
        <div class="name" @click.stop.prevent="toProfileHandle">
          {{ follow.name }}
        </div>
        <div class="tag">{{ follow.account }}</div>
        <p class="content">
          {{ follow.introduction }}
        </p>
        <button
          class="btn follow-btn"
          :class="{ isActive: follow.isFollowing }"
          @click="followToggleHandle"
        >
          {{ follow.isFollowing ? '正在跟隨' : '跟隨' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import followAPI from '../apis/follow'
import { Toast } from '../utils/helpers'

export default {
  name: 'UserFollowCell',
  props: {
    initalFollow: {
      // followerId followingId 只有一個會有值
      followerId: -1,
      followingId: -1,
      account: '',
      name: '',
      avatar: '',
      introduction: '',
      followshipCreatedAt: '',
      isFollowing: false
    }
  },
  computed: {
    id() {
      return this.initalFollow.followerId > 0
        ? this.initalFollow.followerId
        : this.initalFollow.followingId
    }
  },
  data() {
    return {
      follow: {
        followerId: -1,
        followingId: -1,
        account: '',
        name: '',
        avatar: '',
        introduction: '',
        followshipCreatedAt: '',
        isFollowing: false
      }
    }
  },
  watch: {
    initalFollow(newValue) {
      console.log(newValue)
      this.follow = {
        ...this.follow,
        ...newValue
      }
    }
  },
  created() {
    if (this.initalFollow.followingId) {
      this.follow = {
        ...this.initalFollow,
        isFollowing: true
      }
    } else {
      this.follow = { ...this.initalFollow }
    }
    // console.log(this.follow)
  },
  methods: {
    followToggleHandle() {
      if (this.follow.isFollowing) {
        this.removeFollow({ id: this.id })
      } else {
        this.addFollow({ id: this.id })
      }

      this.follow = {
        ...this.follow,
        isFollowing: !this.follow.isFollowing
      }

      this.$emit('after-following-changed')
    },
    toProfileHandle() {
      this.$emit('after-to-profile', {
        userId: this.follow.followerId || this.follow.followingId
      })
    },
    async addFollow({ id }) {
      try {
        const { data } = await followAPI.addFollowing({ id })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        Toast.fire({
          icon: 'success',
          title: '已跟隨該使用者'
        })
      } catch (error) {
        console.log(error)
        this.follow = {
          ...this.follow,
          isFollowing: false
        }
        Toast.fire({
          icon: 'error',
          title: '跟隨使用者錯誤，請稍後再試'
        })
      }
    },
    async removeFollow({ id }) {
      try {
        const { data } = await followAPI.removeFollowing({ id })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        Toast.fire({
          icon: 'success',
          title: '已移除跟隨該使用者'
        })
      } catch (error) {
        console.log(error)
        this.follow = {
          ...this.follow,
          isFollowing: true
        }
        Toast.fire({
          icon: 'error',
          title: '刪除跟隨使用者錯誤，請稍後再試'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cell-container {
  position: relative;
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid var(--light-gary-clr);

  .avatar {
    margin: 10px 10px 10px 15px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
  }

  .name {
    color: var(--black-clr);
    font-weight: 700;
    font-size: 0.937rem;
    cursor: pointer;
  }

  .tag {
    color: var(--cement-gary-clr);
    font-weight: bold;
    font-size: 0.937rem;
  }

  .content {
    margin-bottom: 0;
    letter-spacing: 0.6px;
    font-weight: 500;
    font-size: 0.937rem;
    line-height: 22px;
  }

  .follow-btn {
    position: absolute;
    top: 0;
    right: 0;
    margin: 10px 15px;
    padding: 0 16px;
    height: 30px;
    border: 1px solid var(--primary-clr);
    border-radius: 20px;
    color: var(--primary-clr);
    line-height: 0;

    &.isActive {
      background-color: var(--primary-clr);
      color: #fff;
    }
  }
}
</style>
