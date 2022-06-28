<template>
  <div class="field-select">
    <van-field v-model="value" v-bind="$attrs" readonly clickable name="picker" @click="showPicker = true"> </van-field>
    <fuzzy-search
      v-bind="$attrs"
      :search-label="sLabel"
      :search-value="sValue"
      v-model:show-picker="showPicker"
      @onShow="onShow"
    ></fuzzy-search>
  </div>
</template>
<script lang="ts" setup>
import fuzzySearch from '../fuzzy-search/fuzzySearch';
import { ref } from '@vue/reactivity';
import {withDefaults, defineProps} from 'vue';
interface Props {
  sValue:string;
  sLabel: string | [];
}
const props = withDefaults(defineProps<Props>(),{
  sValue: 'id',
  sLabel: 'value'
})
  const showPicker = ref(false);
  const value = ref('');
    /**
     * 获取展示字段
     * @param item
     * @returns {string|*}
     */
    const getShowData =(item:any) => {
      if (item) {
        if (typeof props.sLabel == 'string') {
          if (props.sLabel.indexOf('item') > -1) {
            return eval(props.sLabel);
          }
          return item[props.sLabel];
        } else {
          let str = '';
          props.sLabel.forEach(i => {
            str = str.concat(item[i] + ' ');
          });
          return str;
        }
      }
    }
    /**
     * 确认 将值传入field
     * @param value
     * @param index
     */
    const onShow =(value:any)=> {
      value = getShowData(value);
    }
</script>

<style lang="scss" scoped>
.close-popup {
  position: absolute;
  right: 0.28rem;
  top: 0.3rem;
}
</style>
