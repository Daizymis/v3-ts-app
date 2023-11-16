<template>
  <div class="home-page clearfix">
    <div class="head-bar">
      <top-bar :permissions-list="permissionsList"></top-bar>
    </div>
    <div class="content-wrap">
      <div v-if="isHomePage"  class="menu-content">
        <entrance/>
      </div>
      <div v-else class="view-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from './child/top-bar';
import entrance from './child/entrance1';
import { mapActions } from 'vuex';
import { communication } from 'api/getData';
export default {
  name: 'HomeIndex',
  components: {
    TopBar,
    entrance
  },
  data() {
    return {
      isHomePage: true, // 是否是首页
      permissionsList: {} //菜单权限
    };
  },
  created() {
    //获取菜单权限
    this.getSysMenusPermission();
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
.home-page {
  min-width: 1205px;
  .head-bar {
    width: 100%;
    min-width: 1205px;
    position: fixed;
    top: 0;
    padding: 0;
    z-index: 100;
  }
  .menu-content {
    margin-top: 85px;
  }
  .view-content {
    width: 90%;
    min-width: 1205px;
    margin: 48px auto;
    overflow-x: hidden;
  }
}
</style>
