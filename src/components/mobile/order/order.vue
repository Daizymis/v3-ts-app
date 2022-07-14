<template>
  <div>
    <van-cell is-link>
      <!-- 使用 title 插槽来自定义标题 -->
      <template #title>
        <span class="custom-title">{{order.shopName}}</span>
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
    >
    </card>
    <div></div>
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
}
interface Props {
  order: orderInt;
}
const props = withDefaults(defineProps<Props>(), {
  order: ()=> ({} as orderInt),
});
defineExpose({ ...props });
</script>