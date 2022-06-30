<template>
  <div class="good-l">
    <van-row :gutter="20">
      <van-col :span="12" v-for="good in goods" :key="good.id" class="g-c" @click="toDetail(good)">
        <div>
          <van-image class="g-img" :src="good.img" />
          <div class="g-t">
            <van-tag v-if="good.isOnsale" type="danger">on Sale</van-tag>
            {{ good.title }}
            </div>
          <div class="g-tag">
            <van-icon name="like" color="red" /><span v-for="tag in good.tag" :key="tag">{{ tag }}</span>
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
import { withDefaults, defineProps, defineEmits, toRefs } from "vue";
import { good } from "@/types/good";
interface Props {
  goods: good[];
}
interface Emits {
    (e: 'toDetail', good: good): void;
  }
const props = withDefaults(defineProps<Props>(), {
  goods: () => [],
});
const emit = defineEmits<Emits>();
let { goods } = toRefs(props);
const toDetail = (good:good)=> {
  emit('toDetail', good);
}
</script>
<style lang="scss" scoped>
.good-l {
  font-size: 0.2rem;
  margin: 0 0.12rem;
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
    span{
      font-size: 0.28rem;
      margin: 0 5px;
    }
  }
  .g-sales {
    color:#dddddd;
  }
  div {
    text-align: left;
  }
}
</style>
