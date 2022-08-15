<template>
  <div>
    <div class="flex-center">
      <van-image
        round
        width="1.2rem"
        height="1.2rem"
        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
      />
    </div>
    <van-notice-bar
      scrollable
      text="商品打折啦，只要9块8，只要9块8，快去下单叭"
    />
    <van-cell
      title="我的订单"
      is-link
      value="查看全部"
      class="m-o"
      :border="false"
      @click="toOrders"
    />
    <van-grid :column-num="5" :border="false">
      <van-grid-item icon="sign" text="待付款" :badge="badge.share || null" />
      <van-grid-item
        icon="share-o"
        text="待分享"
        :badge="badge.share || null"
        @click="() => (showShare = true)"
      />
      <van-grid-item
        icon="clock-o"
        text="待发货"
        :badge="badge.share || null"
      />
      <van-grid-item
        icon="cart-circle-o"
        text="待收货"
        :badge="badge.share || null"
      />
      <van-grid-item
        icon="smile-o"
        text="评价"
        :badge="badge.evaluation || null"
      />
    </van-grid>
    <van-grid :column-num="5" :border="false">
      <van-grid-item
        icon-prefix="iconfont icon-map"
        text="收货地址"
      >
      <i class="van-badge__wrapper van-icon iconfont icon-map van-grid-item__icon"></i>
      <span class="van-grid-item__text">收货地址</span>
      </van-grid-item>
    </van-grid>
  </div>
  <van-share-sheet
    v-model:show="showShare"
    title="立即分享给好友"
    :options="options"
  />
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
const showShare = ref(false);
const options = [
  [
    { name: "微信", icon: "wechat" },
    { name: "朋友圈", icon: "wechat-moments" },
    { name: "微博", icon: "weibo" },
    { name: "QQ", icon: "qq" },
  ],
  [
    { name: "复制链接", icon: "link" },
    { name: "分享海报", icon: "poster" },
    { name: "二维码", icon: "qrcode" },
    { name: "小程序码", icon: "weapp-qrcode" },
  ],
];

const badge = reactive({
  share: 0,
  evaluation: 3,
});
const router = useRouter();
const toOrders = () => {
  router.push("orders");
};
</script>
<style lang="scss" scoped>
.m-o {
  :deep .van-cell__title {
    text-align: left;
  }
}
</style>
