<template>
  <div class="order">
    <van-cell>
      <!-- 使用 title 插槽来自定义标题 -->
      <template #title>
        <slot name="icon">
          <van-icon name="shop-o" />
        </slot>
        <span class="custom-title">{{ order.shopName }}</span>
        <van-icon name="arrow" />
      </template>
      <template #value>
        <span class="danger-font">{{ order.status }}</span>
      </template>
    </van-cell>
    <card
      v-for="good in order.goods"
      :key="good.id"
      :title="good.title"
      :tag="good.tag"
      :desc="good.desc"
      :price="good.price"
      :tags="good.tags"
      :num="good.num"
      :thumbLink = 'good.thumbLink'
    >
    </card>
    <van-divider />
    <div class="bottom-amount">
      <span gray>总价<span currency>{{order.currency}}</span>{{formatAmount(formatAmount(order.totalPrice))}}</span>
      <span v-if="order.decount > 0" gray>,优惠<span currency>{{order.currency}}</span>{{formatAmount(order.decount)}}</span>
      <span>实付<span>{{order.currency}}</span>{{formatAmount(order.price)}}</span>
      </div>
    <van-divider />
    <slot name="footer"></slot>
  </div>
</template>
<script lang="ts">
export default {
  name: "myOrder",
};
</script>
<script setup lang="ts">
import { useSlots, defineProps, withDefaults, defineExpose } from "vue";
import { CardProps } from "../card/card.vue";
import { formatAmount } from '@/utils';
export interface BtnInt {
  title: string;
  show: boolean;
  event: string;
}
export interface Tag {
  title?: string;
  desc?: string;
  status?: string;
}
export interface orderInt {
  id?: string | number;
  icon?: string;
  shopName: string;
  status: string;
  totalPrice: number;
  decount: number;
  price: number;
  goods: CardProps[];
  tags?: Array<Tag>;
  btns: Array<BtnInt>;
  morebtn?: Array<BtnInt>;
  currency?: string;
}
interface Props {
  order: orderInt;
}
const props = withDefaults(defineProps<Props>(), {
  order: () => ({currency: '￥'} as orderInt),
});
defineExpose({ ...props });
</script>
<style lang="scss" scoped>
@import url(../../../assets/css/mobile.scss);
.order {
  :deep .van-cell__title {
    text-align: left;
  }
}
.bottom-amount {
  text-align: right;
  &>span:last-child {
    padding: 0 0.2rem
  }
}
</style>
