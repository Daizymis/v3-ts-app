<template>
  <div>
    <upload-avatar :imageUrl="userInfo.avatar"></upload-avatar>
    <el-divider />
  </div>
</template>
<script>
import { defineComponent, toRefs } from "vue";
import uploadAvatar from "@/components/uploadAvatar.vue";
import { useUserStoreWithOut } from "@/store/modules/user";
export default defineComponent({
  components: {
    uploadAvatar,
  },
  setup() {
    const userstore = useUserStoreWithOut();
    return { ...toRefs(userstore) };
  },
});
</script>
