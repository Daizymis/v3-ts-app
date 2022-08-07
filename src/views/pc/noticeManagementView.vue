<template>
  <el-form
    :inline="true"
    :model="queryParams"
    ref="queryFormRef"
    label-position="left"
    class="demo-form-inline"
  >
    <el-form-item label="Notice title" prop="title">
      <el-input v-model="queryParams.title" placeholder="Notice title" />
    </el-form-item>
    <el-form-item label="Operator" prop="operator">
      <el-select v-model="queryParams.operator" placeholder="Operator">
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item label="Notice type" prop="type">
      <el-select v-model="queryParams.type" placeholder="Notice type">
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="query">Query</el-button>
      <el-button plain @click="reset(queryFormRef)">reset</el-button>
    </el-form-item>
  </el-form>
  <div>
    <el-button type="primary" plain :icon="Plus" @click="add">add</el-button>
    <el-button type="primary" :icon="Edit" @click="edit">Edit</el-button>
    <el-button type="danger" :icon="Delete" @click="avoid">Delete</el-button>
  </div>
  <el-table v-loading="loading" :data="noticeList" style="width: 100%">
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
    <el-form :model="activeRow" class="demo-form-inline" label-width="80">
      <el-form-item label="Order No." prop="orderNo">
        <el-input v-model="activeRow.orderNo" placeholder="Order No." />
      </el-form-item>
      <el-form-item label="Name" prop="name">
        <el-select v-model="activeRow.name" placeholder="name">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <editor
        ref="myEditor"
        toolbar="fullscreen undo redo restoredraft | cut copy paste pastetext"
        @onClick="save"
        :height="300"
      />
    </el-form>
    <template #footer>
      <el-button type="primary" @click="(dialogVisible = false), confirm()"
        >Confirm</el-button
      >
      <el-button plain @click="dialogVisible = false">Cancel</el-button>
    </template>
  </el-dialog>
  <div id="mySecond" class="mySecond">
    <div id="mycarton" class="mycarton"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
window.onmousemove = (event) => {
  const pt = document.body.scrollTop || document.documentElement.scrollTop;
  const pf = document.body.scrollLeft || document.documentElement.scrollLeft;

  let el: HTMLElement = document.getElementById("mycarton");
  el.style.top = event.clientY + pt + 10 + "px";
  el.style.left = event.clientX + pf + "px";
};
export default defineComponent({
  name: "LayoutView",
  components: {},
  setup() {
    const myEditor = ref();
    const data = reactive({
      queryParams: {
        title: "",
        operator: "",
        type: null,
      },
      noticeList: [],
      dialogVisible: false,
      page: 1,
      pageSize: 10,
      total: 0,
    });
    const save = () => {
      console.log(myEditor.value);
    };
    return {
      ...toRefs(data),
      myEditor,
      save,
    };
  },
});
</script>
<style lang="scss" scoped>
.mycarton {
  position: absolute;
  z-index: 999;
  &:after {
    position: absolute;
    width: 0px;
    height: 0px;
    content: " ";
    border-right: 100px solid transparent;
    border-bottom: 100px solid #ff0;
    border-left: 100px solid transparent;
    border-top: 100px solid transparent;
    animation-name: myFirstCarton;
    animation-duration: 2s;
    animation-delay: 2ms;
    animation-iteration-count: infinite;
  }
}

@keyframes myFirstCarton {
  0% {
    border-bottom: 100px solid pink;
  }
  220% {
    border-bottom: 100px solid #ff0;
  }
  40% {
    border-bottom: 100px solid yellowgreen;
  }
  60% {
    border-bottom: 100px solid orange;
  }
  80% {
    border-bottom: 100px solid orangered;
  }
  100% {
    border-bottom: 100px solid palevioletred;
  }
}
</style>
