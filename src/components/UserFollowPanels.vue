<template>
  <div class="follow">
    <UserHeader :name="currentUser.name" :count="currentUser.tweetCount" />

    <section class="follow-tabs">
      <div class="tab-container">
        <tabs
          :options="{ defaultTabHash: 'first-tab', useUrlFragment: false }"
          @changed="tabChanged"
        >
          <tab id="first-tab" name="跟隨者">
            <UserFollowCell
              v-for="follow in followersData"
              :inital-follow="follow"
              :key="follow.id"
            />
          </tab>
          <tab id="second-tab" name="正在跟隨">
            <UserFollowCell
              v-for="follow in followingData"
              :inital-follow="follow"
              :key="follow.id"
            />
          </tab>
        </tabs>
      </div>
    </section>
  </div>
</template>

<script>
import { Tabs, Tab } from 'vue-tabs-component'
import UserHeader from '../components/UserHeader'
import UserFollowCell from '../components/UserFollowCell'
import usersAPI from '../apis/users'
import { Toast } from '../utils/helpers'

export default {
  name: 'UserFollowPanels',
  props: {
    currentUser: {
      id: -1,
      account: '',
      name: '',
      avatar: '',
      cover: '',
      introduction: ''
    }
  },
  components: {
    Tabs,
    Tab,
    UserHeader,
    UserFollowCell
  },
  data() {
    return {
      followersData: [],
      followingData: []
    }
  },
  methods: {
    // TODO: id 要使用 currentUser id
    tabChanged(selectedTab) {
      if (selectedTab.tab.id === 'first-tab') {
        this.fetchCurrentFollowers({ id: this.currentUser.id })
      } else {
        this.fetchCurrentFollowing({ id: this.currentUser.id })
      }
    },
    async fetchCurrentFollowing({ id }) {
      try {
        const { data } = await usersAPI.getCurrentUserFollowing({ id })
        this.followingData = data
        // console.log(' following : ', this.followingData)
      } catch (error) {
        console.log(error)
        Toast.fire({ icon: 'error', title: '取得跟隨中的資料錯誤，請稍後再試' })
      }
    },
    async fetchCurrentFollowers({ id }) {
      try {
        const { data } = await usersAPI.getCurrentUserFollowers({ id })

        this.followersData = data
        // console.log(' followersData : ', this.followersData)
      } catch (error) {
        console.log(error)
        Toast.fire({ icon: 'error', title: '取得跟隨者的資料錯誤，請稍後再試' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.follow {
  flex-grow: 1;
}

::v-deep .follow-tabs {
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
