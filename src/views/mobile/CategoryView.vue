<template>
  <div class="category-nav">
    <van-sidebar class="left" v-model="postData.activeTab">
      <van-sidebar-item
        v-for="tab in postData.tabBarList"
        :key="tab.id"
        :title="tab.title"
      />
    </van-sidebar>
    <div class="right">
      <good-list
        class="g-l"
        v-loading="(postData.goods || []).length === 0"
        :goods="postData.goods"
      ></good-list>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onBeforeMount, reactive, ref } from "vue";
import { getTabBarList, getGoodList } from "@/http/api";
import { good } from "@/types/good";
interface dataInt {
  tabBarList: any[];
  activeTab: number;
  categoryList: any[];
  goods: good[];
}
const postData = reactive<dataInt>({
  tabBarList: [],
  activeTab: 0,
  categoryList: [],
  goods: [],
});

const getCategoryByTab = (tab: number) => {
  console.log(tab);
};
onBeforeMount(() => {
  getTabBarList().then((res) => {
    postData.tabBarList = res.data.data;
    postData.activeTab = 0;
    getCategoryByTab(postData.activeTab);
  });
  getGoodList(postData.activeTab).then((res) => {
    postData.goods = res.data.data || [];
  });
});
</script>
<style lang="scss" scoped>
.category-nav {
  display: flex;
  padding-bottom: 0.7rem;
  .left {
    height: 100vh;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .right {
    width: 80%;
    height: 100vh;
    overflow-y: auto;
  }
  // .g-l {
  //   height: 100%;
  // }
}
</style>
