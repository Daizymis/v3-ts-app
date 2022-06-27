<template>
  <el-upload
    class="avatar-uploader"
    action="uploadAttachment"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>

<script lang="ts">
import { ElMessage } from "element-plus";
import { defineComponent } from "vue";
import type { UploadProps } from "element-plus";
export default defineComponent({
  name: "LoginView",
  props: {
    imageUrl: {
      type: String,
    },
  },
  setup(props, { emit }) {
    const handleAvatarSuccess: UploadProps["onSuccess"] = (
      response,
      uploadFile
    ) => {
      emit("update:imageUrl", URL.createObjectURL(uploadFile.raw!));
    };

    const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
      console.log(rawFile)
      if (rawFile.type !== "image/jpeg" && rawFile.type !== "image/png") {
        ElMessage.error("Avatar picture must be JPG/png format!");
        return false;
      } else if (rawFile.size / 1024 / 1024 > 10) {
        ElMessage.error("Avatar picture size can not exceed 2MB!");
        return false;
      }
      return true;
    };
    return {
      handleAvatarSuccess,
      beforeAvatarUpload,
    };
  },
});
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
