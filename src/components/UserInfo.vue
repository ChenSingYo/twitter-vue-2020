<template>
  <div class="info">
    <UserHeader />

    <section class="introduction">
      <div class="introduction-container">
        <div class="cover-img">
          <img src="https://picsum.photos/600/200" alt="" />
        </div>
        <div class="avatar-container">
          <img src="https://picsum.photos/136" alt="" />
        </div>
        <div class="edit-container">
          <UserInfoMenu
            :is-current-user="false"
            @after-show-edit="afterShowEditHandle"
          />
        </div>
        <div class="summary-board">
          <div class="info-container">
            <div class="name">Name</div>
            <div class="tag">@tag</div>
            <p class="content">content</p>
          </div>
          <div class="follow-container">
            <router-link to="/profile/follow" class="following">
              <span class="count">123 個</span>
              <span class="text">跟隨中</span>
            </router-link>
            <div class="follower">
              <span class="count">456 個</span>
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
            <TweetMessageCell />
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
      showPopupView: false
    }
  },
  methods: {
    tabChanged(selectedTab) {
      console.log('Tab changed to:' + selectedTab.tab.name)
    },
    afterShowEditHandle() {
      this.showPopupView = true
    },
    afterCloseHandle() {
      this.showPopupView = false
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
  // flex-grow: 1;
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
