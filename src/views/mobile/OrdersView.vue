<template>
  <van-nav-bar
    title="我的订单"
    left-arrow
    @click-left="back"
    @click-right="search"
    fixed
  >
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>
  <div class="list-nav">
    <div v-for="order in list" :key="order.id">
      <order :order="order"></order>
      <bottom-btn
        :btns="order.btns"
        :morebtn="order.morebtn"
        :data="order"
        @action="action"
      ></bottom-btn>
    </div>
  </div>
  <div></div>
</template>

<script setup lang="ts">
import { orderInt } from "@/components/mobile/order/order.vue";
import { getOrders } from "@/http/api";
import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";

// import card from '@/components/mobile/card/card'
const list = ref<orderInt[]>([]);
onBeforeMount(() => {
  initData();
});
const initData = () => {
  getOrders().then((data) => {
    console.log(data);
    list.value = data.data.data;
  });
};
const router = useRouter();
const back = () => {
  router.push("personalSet");
};
const search = () => {
  router.push("searchOrder");
};
const action = (type: string, data: orderInt) => {
  console.log(type, data);
};
</script>
<style lang="scss" scoped>
.list-nav {
  background-color: #f1f3f4;
  &>div {
    background-color: #ffffff;
    margin: 5px;
    border-radius: 8px;
    padding-bottom: 10px;
  }
}
</style>
