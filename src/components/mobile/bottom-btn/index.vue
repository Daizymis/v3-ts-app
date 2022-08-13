<template>
  <div class="bottom-btn">
    <van-popover
      v-if="(morebtn || []).length > 0"
      v-model:show="showMore"
      placement="bottom-start"
    >
      <van-row
        v-for="(btn, index) in morebtn"
        :key="btn + index"
        @click="btnClick(btn)"
      >
        {{ ORDERACTION[btn] }}
      </van-row>
      <template #reference> <span gray class="font-24">更多</span> </template>
    </van-popover>
    <div class="float-right">
      <van-button
        v-for="(btn, index) in btns"
        :key="btn + index"
        @click="btnClick(btn)"
        round
      >
        {{ ORDERACTION[btn] }}
      </van-button>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "bottom-btn",
};
</script>
<script lang="ts" setup>
import {
  useSlots,
  defineProps,
  withDefaults,
  defineExpose,
  defineEmits,
  ref,
} from "vue";
import { ORDERACTION } from "@/types/enum";
interface Props {
  btns: any[];
  morebtn?: any[];
  data?: any;
}
interface Emits {
  (e: "action", type: string, data: any): void;
}
const props = withDefaults(defineProps<Props>(), {});
const emit = defineEmits<Emits>();

const showMore = ref(false);
const btnClick = (event: string) => {
  emit("action", event, props.data);
};
</script>
<style lang="scss" scoped>
@import url(../../../assets/css/mobile.scss);
.bottom-btn {
  :deep .van-button {
    width: 120px;
    margin-right: 10px;
  }
}
</style>
