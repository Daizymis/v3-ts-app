<template>
  <div class="card flex">
    <div class="img-nav">
      <slot name="thumb">
        <van-image
          width="1.6rem"
          height="1.8rem"
          fit="cover"
          position="center"
          :src="thumbLink"
        />
      </slot>
      <slot name="tag">
        <div class="img-tag">
          <van-tag color="red"
              >{{tag}}</van-tag>
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
            ><span class="price">{{ price }}</span>
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
interface CardProps {
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
    height: 1.8rem;
    width: 1.6rem;
    background: #eeeeee;
    margin: 0.1rem;
    border-radius: 0.2rem;
    :deep .van-image .van-image__img {
      border-radius: 0.2rem;
    }
  }
  .img-tag {
    position: absolute;
    top: 0.27rem;
    left: 0.1rem;
  }
  .content-nav {
    padding: 0.1rem 0.2rem;
    width: calc(100% - 2.2rem);
  }
  .title {
    font-size: 0.28rem;
    font-weight: bold;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
    overflow: hidden;
  }
  .currency {
    @extend .title;
    font-size: 0.22rem;
  }
  .price {
    @extend .title;
  }
  .left {
    width: 70%;
    font-size: 0.28rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
    overflow: hidden;
    margin-right: 0.1rem;
    flex: 1 1 100%;
    > div {
      line-height: 0.3rem;
      text-align: left;
      margin: 0.1rem 0;
    }
    .desc {
      color: #cccccc;
      white-space: pre-wrap;
    }
    .tags:nth-child(2n-1) {
      margin-right: 0.1rem;
    }
  }
  .right {
    flex: 1 1 50%;
    text-align: right;
    font-size: 0.28rem;
    > div {
      line-height: 0.3rem;
      margin: 0.1rem 0;
    }
    .num {
      color: #cccccc;
      font-size: 0.24rem;
      line-height: 0.3rem;
    }
  }
}
</style>