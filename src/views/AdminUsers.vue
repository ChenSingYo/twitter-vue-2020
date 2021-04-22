<template>
  <div class="wrapper">
    <AdminSidebar class="admin-sidebar" />
    <div class="center-column">
      <div class="header">
        <div class="header-title">使用者列表</div>
      </div>
      <div class="card-wrapper">
        <AdminUserCard />
        <AdminUserCard />
        <AdminUserCard />
        <AdminUserCard />
        <AdminUserCard />
        <AdminUserCard />
        <AdminUserCard />
        <AdminUserCard />
        <AdminUserCard />
        <AdminUserCard />
        <AdminUserCard />
        <AdminUserCard />
      </div>
    </div>
  </div>
</template>

<script>
import AdminSidebar from './../components/AdminSidebar'
import AdminUserCard from './../components/AdminUserCard'

export default {
  name: 'AdminUsers',
  components: {
    AdminSidebar,
    AdminUserCard
  },
  data () {
    return {
      cards: []
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
    grid-row: 1 / 2 ;
    border-left: 1px solid #e6ecf0;
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

  .card-wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fit, 245px);
    margin-top: 70px;
    grid-gap: 15px;
    margin-left: 15px;
  }
}
</style>
