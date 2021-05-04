<template>
  <div class="wrapper">
    <AdminSidebar class="admin-sidebar" />
    <div class="center-column">
      <div class="header">
        <div class="header-title">使用者列表</div>
      </div>
      <div class="card-wrapper">
        <Spinner v-if="isLoading" />
        <AdminUserCard
          v-else
          v-for="user in users"
          :key="user.id"
          :user="user"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AdminSidebar from './../components/AdminSidebar'
import AdminUserCard from './../components/AdminUserCard'
import Spinner from './../components/Spinner'
import adminAPI from './../apis/admin'
import { Toast } from './../utils/helpers'

export default {
  name: 'AdminUsers',
  data() {
    return {
      isLoading: false,
      users: []
    }
  },
  components: {
    AdminSidebar,
    AdminUserCard,
    Spinner
  },
  created() {
    this.fetchUserCards()
  },
  methods: {
    async fetchUserCards() {
      try {
        this.isLoading = true
        const { data } = await adminAPI.getUsers()
        console.log(data)
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        this.users = data
        this.isLoading = false
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: `無法取得使用者名單: ${err.message}`
        })
        this.isLoading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: grid;
  width: 100vw;
  grid-template-columns: 26.2% 1fr;
  grid-template-rows: 100vh;

  .admin-sidebar {
    position: fixed;
    z-index: 1;
    grid-column: 1 / 1;
    grid-row: 1 / 2;
    width: 26.2%;
    height: 100vh;
  }

  .center-column {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    .card-wrapper {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(245px, 1fr));
      justify-items: center;
      margin-top: 75px;
      grid-row-gap: 1rem;
    }

    .header {
      position: fixed;
      z-index: 1;
      width: 100vw;
      height: 55px;
      background: #fff;
      border-bottom: 1px solid #e6ecf0;

      .header-title {
        margin-left: 20px;
        line-height: 55px;
        font-weight: 700;
        font-size: 18px;
        color: #1c1c1c;
      }
    }
  }
}

/* for mobile */
@media screen and (max-width: 768px) {
  .wrapper {
    display: grid;
    width: 100vw;
    grid-template-columns: 100%;
    grid-template-rows: 50px 1fr;

    .admin-sidebar {
      background: white;
      grid-column: 1 / 1;
      grid-row: 1 / 2;
      width: 100%;
      height: 60px;
    }

    .center-column {
      grid-column: 1 / 1;
      grid-row: 2 / 3;
    }
  }
}
</style>
