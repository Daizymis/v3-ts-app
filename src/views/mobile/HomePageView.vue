<template>
  <van-search
    shape="round"
    background="#606b93"
    placeholder="please input keywords"
    @focus="showPicker = true"
    sticky
    readonly
  />
  <!-- 选择器引用 -->
  <!-- <field-select
    s-label="name"
    s-value="name"
    :param="queryData.queryParam"
    :options="queryData.options"
    placeholder="input keywords"
    remote
    @change="changeQueryParam"
    @search="searchKeyWords"
    @confirm="confirmKeyWords"
  ></field-select> -->
  <van-tabs
    v-model:active="dataList.activeTab"
    swipeable
    sticky
    color="#606b93"
  >
    <van-tab
      v-for="item in dataList.tabBarList"
      :key="item.id"
      :title="item.title"
      :name="item.name"
    >
    </van-tab>
  </van-tabs>
  <div class="wrapper scroll-v" ref="wrapper" @scroll="wrapperScroll($event)">
    <div class="wrapper-scroll" :style="{ height: containerHeight + 'px' }">
      <good-list
        :style="{ transform: `translateY(${scrollTopWrapper}px)` }"
        class="g-l"
        v-loading="(showGoods || []).length === 0"
        :goods="showGoods"
        @to-detail="toDetail"
      ></good-list>
    </div>
  </div>
  <teleport v-if="showPicker" to="body">
    <fuzzy-search
      search-label="name"
      search-value="name"
      v-model:show-picker="showPicker"
      :param="queryData.queryParam"
      :options="queryData.options"
      remote
      @change="changeQueryParam"
      @search="searchKeyWords"
      @confirm="confirmKeyWords"
    ></fuzzy-search>
  </teleport>
</template>
<script setup lang="ts">
import { ref, computed, nextTick, onBeforeMount, onMounted, watch } from "vue";
import { getTabBarList, getCategoryList, getGoodList } from "@/http/api";
import { homeData } from "@/types/home";
import { reactive } from "@vue/reactivity";
import { good } from "@/types/good";
import { useRouter } from "vue-router";
interface selectInt {
  queryParam: string;
  options: any[];
  goods: good[];
}

const dataList = reactive(new homeData());
const queryData = reactive({} as selectInt);
const showPicker = ref(false);
//容器真实高度
let containerHeight = ref(0);
//当前状态的索引
let startKey = ref(0);
//视窗内应该显示的 DOM 数量
let showItemNum = ref(0);
//容器dom节点
const wrapper = ref(null);
//容器高度
let wrapperHeight = ref(0);

//片段容器偏移量
let scrollTopWrapper = ref(0);
//元素高度
let elHeight = (
  (((window.clientHeight || window.innerHeight) / 750).toFixed(2) * 100 * 5.5) /
  2
).toFixed(2);
onBeforeMount(() => {
  getTabBarList().then((res) => {
    dataList.tabBarList = res.data.data;
    dataList.activeTab = res.data.data[0].name;
  });
  getGoodList(queryData.queryParam).then((res) => {
    let totalHeight = 0;
    queryData.goods = res.data.data || [];
    //  queryData.goods.forEach((item, index) => {
    //    item.height = totalHeight;
    //    if (index % 2 ===0){
    //       totalHeight +=5.5;
    //    }
    //  })
    containerHeight.value = elHeight * queryData.goods.length;
    initGoodsList();
  });
});
const changeQueryParam = (query: any) => {
  console.log(`get change value ${query}`);
};
const searchKeyWords = (query: string) => {
  getCategoryList(query).then((res) => {
    queryData.options = res.data.data;
  });
};
const confirmKeyWords = (res: any) => {
  queryData.queryParam = res;
};
const initGoodsList = () => {
  nextTick(() => {
    //获取容器高度
    wrapperHeight.value = wrapper.value.clientHeight;
    //运算出应该显示的 DOM 数量
    showItemNum.value = Math.ceil(wrapperHeight.value / elHeight) * 3;
  });
};

//滚动事件
const wrapperScroll = (e) => {
  //计算当前状态的索引
  let tempNum = Math.floor(e.target.scrollTop / elHeight) * 2;
  //当前状态的索引发生变化才触发视图层刷新
  if (tempNum !== startKey.value) {
    startKey.value = tempNum;
    scrollTopWrapper.value = e.target.scrollTop;
    if (tempNum < 2) {
      scrollTopWrapper.value = 0;
    }
  } else if (e.target.scrollTop < scrollTopWrapper.value) {
    startKey.value = tempNum;
    scrollTopWrapper.value = e.target.scrollTop;
  }
};
//对数据进行切片处理方法
const showGoods = computed(() => {
  return [
    ...(queryData.goods || []).slice(
      startKey.value,
      showItemNum.value + startKey.value + 3
    ),
  ];
});
const router = useRouter();
const toDetail = (item: good) => {
  router.push(`/gooddetail/${item.id}`);
};
</script>
<style lang="scss" scope>
.wrapper {
  position: relative;
  width: 100%;
  height: 84vh;
  overflow: auto;
  .wrapper-scroll {
    position: relative;
  }
}
.g-l {
  position: absolute;
  width: 100%;
}
</style>
