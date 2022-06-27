<template>
  <div>
    <div class="home-btn">
      <el-button :icon="House" circle @click="toHome" />
    </div>
    <upload-avatar :imageUrl="userInfo.avatar"></upload-avatar>
    <el-divider />
    <el-form :model="userInfo" label-width="100px" class="userset-nav">
      <el-row>
        <el-col :span="12">
          <el-form-item label="UserName">
            <el-input v-model="userInfo.name" placeholder="UserName" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Gender">
            <el-select v-model="userInfo.gender" placeholder="Locale">
              <el-option
                v-for="item in GENDER"
                v-bind:key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="Phone">
            <el-input v-model="userInfo.phone" placeholder="Phone" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Age">
            <el-input v-model="userInfo.age" placeholder="Age" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="Locale">
            <el-select v-model="userInfo.locale" placeholder="Locale">
              <el-option
                v-for="item in LOCALE"
                v-bind:key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-footer>
      <el-button @click="cancel">Cancel</el-button>
      <el-button @click="save">Save</el-button>
    </el-footer>
  </div>
</template>
<script lang="ts">
import { House } from "@element-plus/icons-vue";
import { defineComponent, ref } from "vue";
import uploadAvatar from "@/components/uploadAvatar.vue";
import { useUserStoreWithOut } from "@/store/modules/user";
import { LOCALE, GENDER } from "@/types/enum";
import { ElMessage } from "element-plus";
import { updateUser } from "@/http/api";
import { UserInfo } from "@/types/user";
import { useRouter } from "vue-router";
export default defineComponent({
  components: {
    uploadAvatar,
  },
  setup() {
    const userstore = useUserStoreWithOut();
    let userInfo = ref({ ...userstore.userInfo });
    const router = useRouter();
    const cancel = () => {
      console.log(userstore.userInfo);
      userInfo.value = { ...userstore.userInfo };
      console.log(userInfo);
    };
    const save = () => {
      updateUser(userInfo.value as UserInfo).then((res) => {
        console.log(res);
        if (res && res.data?.code === 200) {
          ElMessage.success("res.message");
        }
      });
    };
    const toHome = () => {
      router.push("/");
    };
    return { userInfo, LOCALE, GENDER, cancel, save, House, toHome };
  },
});
</script>
<style lang="scss" scoped>
.userset-nav {
  margin: 20px 100px;
}
.home-btn {
  text-align: left;
  padding: 16px;
}
</style>
