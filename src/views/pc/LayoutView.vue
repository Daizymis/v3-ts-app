<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="4">
            <img
              width="30"
              style="transform: translateY(50%)"
              src="../../assets/logo.png"
            />
          </el-col>
          <el-col :span="16"><h3>Manage System</h3></el-col>
          <el-col :span="4" class="user-nav">
            <el-avatar
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              @click="toPersonalSet"
            />
            <div class="name-nav" @click="logOut">
              {{ userName }} <span>退出</span>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container class="main-content">
        <el-aside width="200px">
          <el-menu
            active-text-color="#606b93"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            :default-active="defaultActive"
            text-color="#fff"
            router
          >
            <el-sub-menu index="1">
              <template #title>
                <el-icon><location /></el-icon>
                <span>Navigator One</span>
              </template>
              <el-menu-item-group title="Group One">
                <el-menu-item index="1-1">item one</el-menu-item>
                <el-menu-item index="1-2">item one</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="Group Two">
                <el-menu-item index="1-3">item three</el-menu-item>
              </el-menu-item-group>
              <el-sub-menu index="1-4">
                <template #title>item four</template>
                <el-menu-item index="1-4-1">item one</el-menu-item>
              </el-sub-menu>
            </el-sub-menu>
            <el-menu-item
              v-for="menu in menuList"
              v-bind:key="menu.path"
              :index="menu.name"
            >
              <template #title
                ><el-icon><component :is="menu.meta.icon" /></el-icon
                >{{ menu.meta.title }}</template
              >
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { useUserStoreWithOut } from "@/store/modules/user";
import {
  defineComponent,
  computed,
  onBeforeMount,
  ref,
  onMounted,
  getCurrentInstance,
} from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "LayoutView",
  components: {},
  setup() {
    const router = useRouter();
    const menuList = router.getRoutes().filter((route) => route.meta.isShow);
    const defaultActive = ref(menuList[0].name);
    const userStore = useUserStoreWithOut();
    const handleOpen = (menu: any) => {
      router.push(menu.path);
    };
    const logOut = () => {
      userStore.logOut();
      router.push("/login");
    };
    const userName = computed(() => userStore.userInfo?.name);
    const toPersonalSet = () => {
      router.push("/personalSet");
    };
    onBeforeMount(() => {
      const route = useRoute();
      defaultActive.value = route.name || "";
    });
    onMounted(() => {
      const instance = getCurrentInstance();
    });
    return {
      menuList,
      defaultActive,
      handleOpen,
      logOut,
      userStore,
      userName,
      toPersonalSet,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../../assets/css/common.scss";
.common-layout {
  height: 100%;
}
.el-header {
  background-color: #606b93;
}
.el-container {
  height: 100%;
}
h3 {
  color: #ffffff;
}
.main-content {
  .el-aside {
    height: 100%;
    background-color: #606b93;
  }
}
.name-nav {
  font-size: 10px;
  color: #5dacff;
  span {
    color: #e6a23c;
  }
}
.user-nav {
  @include pointer;
}
@media (-webkit-min-device-pixel-ratio: 1.5) {
  .name-nav {
    width: 100px;
    span {
      color: red;
    }
  }
}
</style>
