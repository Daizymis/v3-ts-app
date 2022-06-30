<template>
    <van-sidebar v-model="postData.activeTab">
        <van-sidebar-item v-for="tab in postData.tabBarList" :key="tab.id" :title="tab.title" />
    </van-sidebar>
</template>
<script lang="ts" setup>
import { onBeforeMount, reactive, ref } from "vue";
import { getTabBarList } from "@/http/api";
interface dataInt {
    tabBarList:any[];
    activeTab:number;
    categoryList:any[];
}
const postData = reactive<dataInt>({
    tabBarList:[],
    activeTab:0,
    categoryList:[],
});

const getCategoryByTab =(tab:number)=>{
    console.log(tab);
}
  onBeforeMount(() => {
    getTabBarList().then((res) => {
        postData.tabBarList = res.data.data;
        postData.activeTab = 0;
        getCategoryByTab(postData.activeTab );
    });
  })
    
</script>