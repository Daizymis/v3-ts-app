<template>
  <div>
    <van-popover
      v-if="(more || []).length > 0"
      v-model:show="showMore"
      theme="dark"
    >
      <van-row
        v-for="(btn, index) in btns"
        :key="btn.text + index"
        @click="btnClick(btn.event)"
      >
        {{ btn.text }}
      </van-row>
      <template #reference>
        <van-button type="primary">更多</van-button>
      </template>
    </van-popover>
    <van-button
      v-for="(btn, index) in btns"
      :key="btn.text + index"
      @click="btnClick(btn.event)"
    >
      {{ btn.text }}
    </van-button>
  </div>
</template>
<script>
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
} from "vue";
interface Props {
  btns: any[];
  more?: any[];
  data?: any;
}
interface Emits {
  (e: "evaluate", data: any): void;
  (e: "showDistribution", data: any): void;
  (e: "addCart", data: any): void;
  (e: "delete", data: any): void;
  (e: "evaluate", data: any): void;
  (e: "sendOut", data: any): void;
}
const props = withDefaults(defineProps<Props>(), {});
const emit = defineEmits<Emits>();

const [showMore, toggle] = useToggle(false);
const btnClick = (event: string) => {
  emit(event, props.data);
};
const actions = () => {
  toggle(!showMore.value);
};
</script>