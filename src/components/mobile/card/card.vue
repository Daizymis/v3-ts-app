<template>
  <div class="card flex">
    <div class="img-nav">
      <slot name="thumb">
        <van-image fit="cover" position="center" :src="thumbLink" />
      </slot>
      <slot name="tag">
        <div class="img-tag">
          <van-tag color="red">{{ tag }}</van-tag>
        </div>
      </slot>
    </div>
    <div class="content-nav flex-between">
      <div class="left">
        <slot name="title" :item="title">
          <div class="title">{{ title }}</div>
        </slot>
        <slot name="desc">
          <div class="desc">{{ desc }}</div>
        </slot>
        <slot name="tags">
          <div>
            <van-tag
              v-for="item in tags"
              :key="item"
              color="#ffa700"
              plain
              class="tags"
              >{{ item }}</van-tag
            >
          </div>
        </slot>
      </div>
      <div class="right">
        <slot name="real-price">
          <div>
            <span class="currency">{{ currency }}</span
            ><span class="price">{{ formatAmount(price) }}</span>
          </div>
        </slot>
        <slot name="num">
          <div class="num">x{{ num }}</div>
        </slot>
      </div>
    </div>
  </div>
  <slot name="bottom"></slot>
</template>
<script lang="ts">
export default {
  name: "myCard",
};
</script>
<script setup lang="ts">
import { number } from "echarts";
import { makeStringProp, numericProp } from "@/utils/props";
import { useSlots, defineProps, withDefaults, defineExpose } from "vue";
import { formatAmount } from '@/utils';
export interface CardProps {
  id?: string | number;
  tag?: string;
  num?: number;
  desc?: string;
  thumb?: string;
  title?: string;
  price?: typeof numericProp;
  centered?: boolean;
  lazyLoad?: boolean;
  currency?: string;
  thumbLink?: string;
  originPrice?: typeof numericProp;
  tags?: Array<string>;
}
const props = withDefaults(defineProps<CardProps>(), {
  thumbLink: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
  currency: "￥",
});
const slots = useSlots();
defineExpose({ ...props });
</script>
<style lang="scss" scoped>
.card {
  .img-nav {
    height: 180px;
    width: 160px;
    background: #eeeeee;
    margin: 10px;
    border-radius: 20px;
    :deep .van-image {
      height: 100%;
      width: 100%;
      .van-image__img {
        border-radius: 20px;
      }
    }
    position: relative;
  }
  .img-tag {
    position: absolute;
    top: -1px;
  }
  .content-nav {
    padding: 10px 10px;
    width: calc(100% - 200px);
  }
  .title {
    font-size: 28px;
    font-weight: bold;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
    overflow: hidden;
  }
  .currency {
    @extend .title;
    font-size: 22px;
  }
  .price {
    @extend .title;
  }
  .left {
    width: 70%;
    font-size: 28px;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
    overflow: hidden;
    margin-right: 10px;
    flex: 1 1 100%;
    > div {
      line-height: 30px;
      text-align: left;
      margin: 10px 0;
    }
    .desc {
      color: #cccccc;
      white-space: pre-wrap;
      word-break: break-word;
    }
    .tags:nth-child(2n-1) {
      margin-right: 10px;
    }
  }
  .right {
    // flex: 1 1 50%;
    text-align: right;
    font-size: 28px;
    > div {
      line-height: 30px;
      margin: 10px 0;
    }
    .num {
      color: #cccccc;
      font-size: 24px;
      line-height: 24px;
    }
  }
}
</style>
