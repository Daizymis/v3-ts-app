<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="8">
        <div  id="echarts1"></div>
      </el-col>
      <el-col :span="8">
        <div id="echarts2"></div>
      </el-col>
       <el-col :span="8">
       </el-col>
    </el-row>
    <el-row :gutter="12">
      <el-col :span="8">
        <el-card shadow="always"> Always </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="always"> Hover </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="always"> Never </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, onBeforeMount } from "@vue/runtime-core";
import * as echarts from "echarts";
import {pieOptions1, lineOption} from "@/assets/js/echarts"
onMounted(() => {
  const chartDom1 = document.getElementById("echarts1")!;
   const chartDom2= document.getElementById("echarts2")!;
  let myChart1 = echarts.init(chartDom1);
  let myChart2 = echarts.init(chartDom2);
    myChart1.setOption(pieOptions1);
    myChart2.setOption(lineOption);
});
</script>
<style lang="scss" scoped>
#echarts1,
#echarts2 {
  min-width: 100%;
  min-height: 300px;
}
</style>