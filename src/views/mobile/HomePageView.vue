<template>
  <van-search
    shape="round"
    background="#606b93"
    placeholder="please input keywords"
    @focus="showPicker = true"
    sticky
  />
  <van-tabs v-model:active="activeTab" swipeable sticky color="#606b93">
    <van-tab
      v-for="item in dataList.tabBarList"
      :key="item.id"
      :title="item.title"
      :name="item.name"
    >
      <good-list v-loading="(queryData.goods || []).length === 0" :goods="queryData.goods"></good-list>
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
      @confirm="onfirmKeyWords"
    ></fuzzy-search>
  </teleport>
</template>
<script lang="ts" setup>
import { getTabBarList, getCategoryList, getGoodList } from "@/http/api";
import { homeData } from "@/types/home";
import { reactive } from "@vue/reactivity";
import { onBeforeMount, onMounted, ref } from "vue";
import fieldSelect from "@/components/mobile/field-select/fieldSelect";
import fuzzySearch from "@/components/mobile/fuzzy-search/fuzzySearch";
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
    dataList.activeTab = res.data.data[0];
  });
  getGoodList(queryData.queryParam).then((res) => {
    queryData.goods = res.data.data || [];
    console.log(queryData.goods);
  });
});
const changeQueryParam = (query: any) => {
  console.log(query);
};
const searchKeyWords = (query: any) => {
  getCategoryList().then((res) => {
    queryData.options = res.data.data;
  });
};
</script>
