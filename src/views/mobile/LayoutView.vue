<template>
  <div>
    <keep-alive :include="includeList">
    <router-view></router-view>
    </keep-alive>
    <van-tabbar v-model="active">
      <van-tabbar-item name="home" icon="home-o" @click="toLink('home')"
        >home</van-tabbar-item
      >
      <van-tabbar-item name="category" icon="label-o">category</van-tabbar-item>
      <van-tabbar-item name="message" icon="chat-o">message</van-tabbar-item>
      <van-tabbar-item name="personal" icon="user-o">personal</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const active = ref("home");
const router = useRouter();
const includeList = [{path: '/home'}]
const toLink = (url: string) => {
  router.push(url);
};
</script>
