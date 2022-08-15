<template>
  <div class="bottom-btn">
    <div>
      <van-popover
        ref="morePopver"
        v-if="(morebtn || []).length > 0"
        v-model:show="showMore"
        :placement="top ? 'top-start' : 'bottom-start'"
        class="more-popver"
        @open="selectPopover"
      >
        <van-row
          v-for="(btn, index) in morebtn"
          :key="btn + index"
          @click="btnClick(btn)"
          class="hover-text"
        >
          {{ ORDERACTION[btn] }}
        </van-row>
        <template #reference>
          <span ref="moreBtn" gray class="font-24 more-text">更多</span>
        </template>
      </van-popover>
    </div>
    <div>
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
  onMounted,
} from "vue";
import { ORDERACTION } from "@/types/enum";
import { PopoverAction } from "vant";
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
const top = ref(false);
const btnClick = (event: string) => {
  emit("action", event, props.data);
};
const moreBtn = ref();
const selectPopover = () => {
  const height = document.documentElement.clientHeight;
  const domRect = moreBtn.value.getBoundingClientRect();
  if (height - domRect.top < ((props.morebtn || []).length + 1) * 40) {
    top.value = true;
  } else {
    top.value = false;
  }
};
</script>
<style lang="scss" scoped>
@import url(../../../assets/css/mobile.scss);
.bottom-btn {
  display: flex;
  justify-content: space-between;
  margin: 20px 0 10px;
  align-items: center;
  :deep .van-button {
    width: 120px;
    margin-right: 10px;
  }
  .more-text {
    font-size: 20px;
  }
  :deep .van-popover__wrapper {
    margin-left: 10px;
  }
}
.hover-text {
  padding: 15px 0;
  margin: 0 15px;
  width: 150px;
  &:not(:last-child) {
    border-bottom: 1px solid #dddddd;
  }
}
</style>
