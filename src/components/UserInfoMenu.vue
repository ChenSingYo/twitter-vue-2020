<template>
  <div class="menu">
    <div class="menu-container">
      <template v-if="isCurrentUser">
        <button class="btn" @click="showEdit">編輯使用者資料</button>
      </template>
      <template v-else>
        <button class="btn btn-circle">
          <unicon name="envelope" fill="#ff6600"></unicon>
        </button>
        <button class="btn btn-circle" :class="{ subscript: isSubscript }">
          <template v-if="isSubscript">
            <unicon
              name="bell-check"
              fill="#ff6600"
              viewBox="0 0 39 37"
            ></unicon>
          </template>
          <template v-else>
            <unicon name="bell" fill="#ff6600" viewBox="0 0 48 45"></unicon>
          </template>
        </button>
        <button
          class="btn"
          :class="{ following: isFollowing }"
          @click="followToggleHandle"
        >
          {{ isFollowing ? '正在跟隨' : '跟隨' }}
        </button>
      </template>
    </div>
  </div>
</template>

<script>
import followAPI from '../apis/follow'
import { Toast } from '../utils/helpers'

export default {
  name: 'UserInfoMenu',
  props: {
    isCurrentUser: {
      type: Boolean,
      default: false
    },
    isSubscript: {
      type: Boolean,
      default: false
    },
    initialIsFollowing: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    initialIsFollowing(newValue) {
      this.isFollowing = newValue
    }
  },
  data() {
    return {
      isFollowing: this.initialIsFollowing
    }
  },
  methods: {
    showEdit() {
      this.$emit('after-show-edit', true)
    },
    followToggleHandle() {
      const { id } = this.$route.params
      if (!id) return
      if (this.isFollowing) {
        this.removeFollow({ id })
      } else {
        this.addFollow({ id })
      }
      this.isFollowing = !this.isFollowing
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
button {
  padding: 0 16px;
  height: 40px;
  border: 1px solid var(--primary-clr);
  border-radius: 20px;
  color: var(--primary-clr);
  line-height: 0;

  &:not(:last-child) {
    margin-right: 10px;
  }

  &:focus {
    box-shadow: none;
  }

  &.following {
    background-color: var(--primary-clr);
    color: #fff;
  }

  &.subscript {
    background-color: var(--primary-clr);
  }
}

.btn-circle {
  margin: 0;
  padding: 0;
  width: 40px;
  height: 40px;
}

.btn:hover {
  color: var(--primary-hover-clr);
}
</style>
