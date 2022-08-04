<template>
  <editor
    ref="myEditor"
    toolbar="fullscreen undo redo restoredraft | cut copy paste pastetext"
    @onClick="save"
    :height="300"
  />
  <el-button @click="save">Save</el-button>
</template>
<script setup lang="ts">
import { ref } from "vue";
const myEditor = ref();
const save = () => {
  console.log(myEditor.value);
};
</script>
