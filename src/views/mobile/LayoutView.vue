<template>
  <div class="mobile-layout">
    <div class="main">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
    <van-tabbar v-model="active">
      <van-tabbar-item name="home" icon="wap-home" @click="toLink('home')"
        >home</van-tabbar-item
      >
      <van-tabbar-item name="category" icon="bars" @click="toLink('category')"
        >category</van-tabbar-item
      >
      <van-tabbar-item
        name="message"
        icon="chat"
        badge="35"
        @click="toLink('message')"
        >message</van-tabbar-item
      >
      <van-tabbar-item name="shopCart" icon="cart" @click="toLink('shopCart')"
        >shopCart</van-tabbar-item
      >
      <van-tabbar-item
        name="personal"
        icon="manager"
        @click="toLink('personalSet')"
        >personal</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>
<script lang="ts" setup>
import { onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const active = ref<string>("home");
const router = useRouter();
const route = useRoute();
document.title = "smartmall";
// const includeList = [{ path: "/home" }];
const toLink = (url: string) => {
  router.push(url);
};
onBeforeMount(() => {
  console.log(active.value);
  active.value = route?.meta?.footer || "home";
});
</script>
