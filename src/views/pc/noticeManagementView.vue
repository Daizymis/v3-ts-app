<template>
    <div>hello world</div>
  <editor
  ref="myEditor"
    v-model="content"
    @onClick="save"
  />
  <el-button @click="save">Save</el-button>
</template>
<script setup lang="ts">
import editor from "@/components/editor";
import { ref } from "vue";
const content = ref("");
const myEditor = ref();
const save = () => {
    console.log(myEditor.value);
}
</script>
