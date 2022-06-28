<template>
  <van-search
    v-model="value"
    shape="round"
    background="#606b93"
    placeholder="请输入搜索关键词"
  />
  <field-select
    ref="BillIdSelect"
    label=""
    placeholder="请选择公司名称"
    s-label="item.custName + ' (' + item.billcname + ')'"
    s-value="id"
    :param="billid"
    :options="postData.billingDetails"
    style="margin-left: -0.2rem; width: 80%"
    @confirm="(billid = $event), _getTicketDetails()"
    background="#606b93"
  ></field-select>

  <div></div>
  <van-tabs v-model:active="activeTab">
    <van-tab
      v-for="item in dataList.tabBarList"
      :key="item.id"
      :title="item.title"
      :name="item.name"
    ></van-tab>
  </van-tabs>
</template>
<script lang="ts" setup>
import { getTabBarList } from "@/http/api";
import { homeData } from "@/types/home";
import { reactive } from "@vue/reactivity";
import { onBeforeMount, onMounted } from "@vue/runtime-core";
import fieldSelect from "@/components/mobile/field-select/fieldSelect";

const dataList = reactive(new homeData());
onBeforeMount(() => {
  getTabBarList().then((res) => {
    dataList.tabBarList = res.data.data;
    dataList.activeTab = res.data.data[0];
  });
});
</script>
