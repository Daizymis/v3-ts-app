<template>
  <van-nav-bar
    title="我的订单"
    left-arrow
    @click-left="back"
    @click-right="search"
  >
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>
  <order v-for="order in list" :key="order.id" :order="order"></order>
  <div></div>
</template>

<script setup lang="ts">
import { orderInt } from "@/components/mobile/order/order.vue";
import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";

// import card from '@/components/mobile/card/card'
const list = ref<orderInt[]>([]);
onBeforeMount(() => {
  getOrders();
});
const getOrders = () => {
  list.value = [
    {
      icon: "",
      shopName: "臭宝旗舰店",
      status: "等待发货",
      totalPrice: 0.0,
      decount: 0.0,
      price: 0.0,
      goods: [
        {
          title: " [狂暑季价] 臭宝螺狮粉大片腐竹柳州螺狮粉",
          tag: "标签",
          desc: "爆爆浓汤螺狮粉（乐享版）280g*3袋",
          price: 0.0,
          tags: ["7天无理由", "运费险"],
          num: 3,
        },
      ],
      tags: [],
      btns: [],
      morebtn: [],
    },
  ];
};
const router = useRouter();
const back = () => {
  router.push("personalSet");
};
const search = () => {
  router.push("searchOrder");
};
</script>
