<template>
  <el-form
    :inline="true"
    :model="queryParams"
    ref="queryFormRef"
    class="demo-form-inline"
  >
    <el-form-item label="Order No." prop="orderNo">
      <el-input v-model="queryParams.orderNo" placeholder="Order No." />
    </el-form-item>
    <el-form-item label="Operator" prop="operator">
      <el-select v-model="queryParams.operator" placeholder="Operator">
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="query">Query</el-button>
      <el-button plain @click="reset(queryFormRef)">reset</el-button>
    </el-form-item>
  </el-form>
  <el-table v-loading="loading" :data="showedOrderList" style="width: 100%">
    <el-table-column fixed prop="orderNo" label="orderNo" width="150" />
    <el-table-column fixed prop="date" label="Date" width="150" />
    <el-table-column prop="name" label="Name" width="120" />
    <el-table-column prop="state" label="State" width="120" />
    <el-table-column prop="city" label="City" width="120" />
    <el-table-column prop="address" label="Address" width="600" />
    <el-table-column prop="zip" label="Zip" width="120" />
    <el-table-column fixed="right" label="Operations" width="120">
      <template #default="scope">
        <el-button link type="primary" size="small" @click="toDetail(scope.row)"
          >Detail</el-button
        >
        <el-button link type="primary" size="small" @click="edit(scope.row)"
          >Edit</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    v-model:currentPage="page"
    :page-size="pageSize"
    :pager-count="11"
    layout="total, prev, pager, next"
    :total="total"
    @current-change="currentPageChange"
  />
  <el-dialog v-model="dialogVisible" title="edit">
    <el-form
    :model="activeRow"
    class="demo-form-inline"
    label-width="80"
  >
    <el-form-item label="Order No." prop="orderNo">
      <el-input v-model="activeRow.orderNo" placeholder="Order No." />
    </el-form-item>
    <el-form-item label="Name" prop="name">
      <el-select v-model="activeRow.name" placeholder="name">
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item>
  </el-form>
   <template #footer>
     <el-button type="primary" @click="dialogVisible = false,confirm()">Confirm</el-button>
      <el-button plain @click="dialogVisible = false">Cancel</el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import { FormInstance } from "element-plus";
import { defineComponent, onMounted, reactive, toRefs, ref } from "vue";
import { orderData, orderInt } from "@/types/order";
import { getOrderList } from "@/http/api";

export default defineComponent({
  setup() {
    const data = reactive(new orderData());
    let loading = ref(false);
    onMounted(() => {
        loading.value = true;
        getOrderList(data.queryParams).then(res => {
            data.orderList = res.data.rows;
            getList(1, res.data.rows);
            data.total = res.data.total;
            loading.value = false;
        })
      
    });
    const getList = (page = 1, arr = data.orderList) => {
      data.showedOrderList = arr.slice(
        (page - 1) * data.pageSize,
        (page - 1) * data.pageSize + 5
      );
      
    };
    const query = () => {
      if (data.queryParams.orderNo || data.queryParams.operator) {
        let arr =
          data.orderList.filter(
            (item) =>
              item.orderNo.indexOf(data.queryParams.orderNo) !== -1 &&
              item.name.indexOf(data.queryParams.operator) !== -1
          ) || [];
        data.total = arr.length;
        getList(1, arr);
      }
      console.log(data.showedOrderList);
    };
    const reset = (formRef: FormInstance) => {
      formRef.resetFields();
      data.page = 1;
      getList();
    };
    const toDetail = (row: orderInt) => {
      console.log(row);
    };
    const currentPageChange = (page: number) => {
      getList(page);
    };
    const edit = (row: orderInt) => {
      data.activeRow = {...row};
      data.dialogVisible = true;
    };
    const confirm = () =>{
        const obj:any = data.showedOrderList.find(item => item.id === data.activeRow.id);
        obj.orderNo = data.activeRow.orderNo;
        obj.name = data.activeRow.name;
    }
    return {
      ...toRefs(data),
      query,
      loading,
      reset,
      toDetail,
      currentPageChange,
      edit,
      confirm
    };
  },
});
</script>
