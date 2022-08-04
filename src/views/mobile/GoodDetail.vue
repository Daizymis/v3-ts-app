<template>
    <div>hello goods{{id}}</div>
</template>
<script setup lang="ts">
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute } from "vue-router";

const route = useRoute();
const id = route.params.id;
onBeforeRouteLeave((to, from, next) => {
    next();
})
onBeforeRouteUpdate((to) => {
   console.log(to.params.id);
})
</script>