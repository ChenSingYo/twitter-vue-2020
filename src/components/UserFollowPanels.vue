<template>
  <div class="follow">
    <UserHeader />

    <section class="follow-tabs">
      <div class="tab-container">
        <tabs
          :options="{ defaultTabHash: 'first-tab', useUrlFragment: false }"
          @changed="tabChanged"
        >
          <tab id="first-tab" name="跟蹤者"> <UserFollowCell /> </tab>
          <tab id="second-tab" name="正在跟隨"> <UserFollowCell /> </tab>
        </tabs>
      </div>
    </section>
  </div>
</template>

<script>
import { Tabs, Tab } from 'vue-tabs-component'
import UserHeader from '../components/UserHeader'
import UserFollowCell from '../components/UserFollowCell'

export default {
  name: 'UserFollowPanels',
  components: {
    Tabs,
    Tab,
    UserHeader,
    UserFollowCell
  },
  methods: {
    tabChanged() {}
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
