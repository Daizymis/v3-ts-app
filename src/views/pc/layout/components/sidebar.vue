<template>
  <el-menu
    active-text-color="#606b93"
    background-color="#545c64"
    class="el-menu-vertical-demo sidebar-container"
    :collapse="isCollapse"
    :default-active="defaultActive"
    text-color="#fff"
    router
  >
    <template
      v-for="menu in menuList"
      v-bind:key="menu.path"
      :index="menu.name"
    >
      
      <el-sub-menu v-if="menu.children.length" :index="menu.meta.title">
        <template #title>
          <el-icon><location /></el-icon>
          <span>{{ menu.meta.title }}</span>
        </template>
        <el-menu-item-group v-for="child in menu.children" v-bind:key="child" :title="child.title">
          <el-menu-item index="1-1">item one</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu>
          <template #title>item four</template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item v-else  :index="menu.name">
        <el-icon><component :is="menu.meta.icon" /></el-icon>
        <template #title>{{ menu.meta.title }}</template>
      </el-menu-item>
    </template>
  </el-menu>
</template>
<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  ref
} from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "sideBar",
  components: {},
  props: {
    isCollapse: Boolean,
  },
  setup() {
    const router = useRouter();
    const menuList = router.getRoutes().filter((route) => route.meta.isShow);
    console.log(menuList);
    const defaultActive = ref(menuList[0].name);
    const handleOpen = (menu: any) => {
      router.push(menu.path);
    };
    onBeforeMount(() => {
      const route = useRoute();
      defaultActive.value = route.name || "";
    });
    return {
      menuList,
      defaultActive,
      handleOpen,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../../../../assets/css/common.scss";
.sidebar-container {
  transition: width 0.28s;
  width: $sideBarWidth !important;
  height: calc(100% - 60px);
  position: fixed;
  font-size: 0px;
  top: 60px;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}
.el-container {
  height: 100%;
}
h3 {
  color: #ffffff;
}
</style>
