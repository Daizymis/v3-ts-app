<template>
  <div class="good-l">
    <van-row class="g-r" :gutter="20" @scroll="touchScroll">
      <van-col
        ref="refCol"
        :span="12"
        v-for="good in showGoods"
        :key="good.id"
        class="g-c"
        @click="toDetail(good)"
        :style="`height: ${height}px`"
      >
        <div>
          <van-image class="g-img" :src="good.img" />
          <div class="g-t">
            <van-tag v-if="good.isOnsale" type="danger">on Sale</van-tag>
            {{ good.title }}
          </div>
          <div class="g-tag">
            <van-icon name="like" color="red" /><span
              v-for="tag in good.tag"
              :key="tag"
              >{{ tag }}</span
            >
          </div>
          <div>
            <span class="g-price"
              >$<span>{{ good.unit }}</span></span
            ><span class="g-sales">{{ good.sales }}</span>
          </div>
        </div>
      </van-col>
    </van-row>
  </div>
</template>
<script lang="ts" setup>
import {
  withDefaults,
  defineProps,
  defineEmits,
  toRefs,
  watch,
  ref,
  onMounted,
  reactive,
  getCurrentInstance,
  nextTick,
  VueElement,
} from "vue";
import { good } from "@/types/good";
interface Props {
  goods: good[];
}
interface Emits {
  (e: "toDetail", good: good): void;
}
const props = withDefaults(defineProps<Props>(), {
  goods: () => [],
});
const emit = defineEmits<Emits>();
let showGoods = ref<any>([]);
watch(
  () => props.goods,
  (val) => {
    showGoods.value = val.slice(0, 10) || [];
    nextTick(() => {
      let el = document.getElementsByClassName("g-c")[0];
      data.itemH = el.clientHeight;
      let total = document.getElementsByClassName('good-l')[0];
      
      data.scrollH = total.scrollHeight;
      let nav = document.getElementsByClassName('g-r')[0];
      data.divH = nav.offsetHeight;
      console.log(data);
    });
  }
);
let data = reactive({
  itemH: 0,
  scrollH: 0,
  divH: 0,
});
const instance = getCurrentInstance();
// onMounted(() => {
// });
const toDetail = (good: good) => {
  emit("toDetail", good);
};
const touchScroll = (e: any) => {
  if (e) {
    console.log(e);
  }
};
</script>
<style lang="scss" scoped>
.good-l {
  font-size: 0.2rem;
  margin: 0 0.12rem;
  margin-bottom: 50px;
  .van-col {
    padding: 0.2rem 0;
  }
  .g-img {
  }
  .g-t {
    white-space: nowrap;
    font-size: 0.24rem;
    overflow: hidden;
    font-weight: bold;
  }
  .g-tag {
    font-size: 0.12rem;
    color: #dddddd;
    margin: 0.1rem 0;
    span {
      margin-right: 0.2rem;
    }
    span:first-child {
      color: red;
    }
  }
  .g-price {
    color: red;
    font-weight: 500;
    span {
      font-size: 0.28rem;
      margin: 0 5px;
    }
  }
  .g-sales {
    color: #dddddd;
  }
  div {
    text-align: left;
  }
}
</style>
