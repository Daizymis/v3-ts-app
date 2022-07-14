<template>
  <van-search
    shape="round"
    background="#606b93"
    placeholder="please input keywords"
    @focus="showPicker = true"
    sticky
    readonly
  />
  <!-- 选择器引用 -->
  <!-- <field-select
    s-label="name"
    s-value="name"
    :param="queryData.queryParam"
    :options="queryData.options"
    placeholder="input keywords"
    remote
    @change="changeQueryParam"
    @search="searchKeyWords"
    @confirm="confirmKeyWords"
  ></field-select> -->
  <van-tabs v-model:active="dataList.activeTab" swipeable sticky color="#606b93">
    <van-tab
      v-for="item in dataList.tabBarList"
      :key="item.id"
      :title="item.title"
      :name="item.name"
    >
      <good-list
        v-loading="(queryData.goods || []).length === 0"
        :goods="queryData.goods"
      ></good-list>
    </van-tab>
  </van-tabs>
  <teleport to="body">
    <fuzzy-search
      search-label="name"
      search-value="name"
      v-model:show-picker="showPicker"
      :param="queryData.queryParam"
      :options="queryData.options"
      remote
      @change="changeQueryParam"
      @search="searchKeyWords"
      @confirm="confirmKeyWords"
    ></fuzzy-search>
  </teleport>
</template>
<script lang="ts" setup>
import { getTabBarList, getCategoryList, getGoodList } from "@/http/api";
import { homeData } from "@/types/home";
import { reactive } from "@vue/reactivity";
import { onBeforeMount, onMounted, ref } from "vue";
import { good } from "@/types/good";
interface selectInt {
  queryParam: string;
  options: any[];
  goods: good[];
}

const dataList = reactive(new homeData());
const queryData = reactive({} as selectInt);
const showPicker = ref(false);
onBeforeMount(() => {
  getTabBarList().then((res) => {
    dataList.tabBarList = res.data.data;
    dataList.activeTab = res.data.data[0].name;
  });
  getGoodList(queryData.queryParam).then((res) => {
    queryData.goods = res.data.data || [];
  });
});
const changeQueryParam = (query: any) => {
  console.log(`get change value ${query}`);
};
const searchKeyWords = (query: string) => {
  getCategoryList(query).then((res) => {
    queryData.options = res.data.data;
  });
};
const confirmKeyWords = (res: any) => {
  queryData.queryParam = res;
};
</script>
