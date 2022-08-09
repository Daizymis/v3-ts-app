<template>
  <Particles
    id="tsparticles"
    :particlesInit="particlesInit"
    :particlesLoaded="particlesLoaded"
    :options="options"
  />
  <div id="theme">
    <el-button type="info" @click="light">Light</el-button>
    <el-button type="info" @click="dark">Dark</el-button>
  </div>
  <div class="login-nav">
    <el-form
      :model="loginForm"
      :rules="rules"
      ref="loginFormRef"
      label-width="80px"
      status-icon
      class="login-form"
      :style="{ backgroundColor: theme === 'light' ? '#efebeb4f' : '#ffffff' }"
    >
      <el-form-item label="用户名" prop="userName">
        <el-input
          v-model="loginForm.userName"
          class="box-info"
          placeholder="请输入"
        />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="loginForm.password"
          class="box-info"
          placeholder="请输入"
        />
      </el-form-item>
      <el-footer style="text-align: center;"> 
        <el-button size="large" plain @click="onSubmit(loginFormRef)"
          >登录</el-button
        >
        <el-button size="large" plain @click="onCancel(loginFormRef)"
          >清空</el-button
        >
      </el-footer>
    </el-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from "vue";
import { ElLoading, FormInstance } from "element-plus";
import { initData } from "@/types/login";
import { login } from "@/http/api";
import router from "@/router";
import { useUserStoreWithOut } from "@/store/modules/user";
import { UserInfo } from "@/types/user";
import { loadFull } from "tsparticles";
import { useUser } from "@/hook/useUser";
enum THEME {
  "dark" = "dark",
  "light" = "light",
}
export default defineComponent({
  name: "LoginView",
  setup() {
    const data = reactive(new initData());
    // const userStore = useUserStoreWithOut();
    const options = {
      fpsLimit: 60,
      particles: {
        move: {
          bounce: false,
          direction: "none",
          enable: true,
          outModes: "out",
          random: false,
          speed: 2,
          straight: false,
        },
        number: { density: { enable: true, area: 800 }, value: 80 },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      themes: [
        {
          name: "dark",
          default: {
            value: true,
            mode: "dark",
          },
          options: {
            background: {
              color: "#000",
            },
            particles: {
              color: {
                value: "#fff",
              },
            },
          },
        },
        {
          name: "light",
          default: {
            value: true,
            mode: "light",
          },
          options: {
            background: {
              color: "#fff",
            },
            particles: {
              color: {
                value: "#000",
              },
            },
          },
        },
      ],
    };
    const rules = {
      userName: [
        {
          required: true,
          message: "Please input Activity name",
          trigger: "blur",
        },
        {
          min: 3,
          max: 10,
          message: "Length should be 3 to 10",
          trigger: "blur",
        },
      ],
      password: [
        { required: true, message: "Please input password" },
        {
          min: 3,
          max: 10,
          message: "Length should be 3 to 10",
          trigger: "blur",
        },
      ],
    };
    const {setUserInfo, setToken} = useUser();
    const onSubmit = (loginFormRef: FormInstance) => {
      loginFormRef?.validate((valid: boolean) => {
        if (valid) {
          const loading = ElLoading.service({
            lock: true,
            text: "Loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          login(data.loginForm).then((res) => {
            loading.close();
            let user: UserInfo = {
              name: data.loginForm.userName,
              age: 18,
              password: data.loginForm.password,
            };
            setUserInfo(user);
            setToken("122411332342");
            router.push("/home");
          });
        }
      });
    };
    const onCancel = (loginFormRef: FormInstance) => {
      loginFormRef.resetFields();
    };
    const particlesInit = async (engine: any) => {
      await loadFull(engine);
    };
    let themeableContainer = reactive({});
    const particlesLoaded = async (container: any) => {
      themeableContainer = container;
    };
    const theme = ref(THEME.light);
    const light = () => {
      if (themeableContainer && theme.value !== THEME.light) {
        theme.value = THEME.light;
        (themeableContainer as any).loadTheme(THEME.light);
      }
    };
    const dark = () => {
      console.log(theme.value);
      if (themeableContainer && theme.value !== THEME.dark) {
        theme.value = THEME.dark;
        (themeableContainer as any).loadTheme(THEME.dark);
      }
    };
    return {
      rules,
      ...toRefs(data),
      options,
      light,
      dark,
      theme,
      onSubmit,
      onCancel,
      particlesInit,
      particlesLoaded,
      themeableContainer,
    };
  },
});
</script>
<style lang="scss" scoped>
.login-nav {
  width: 100%;
  height: 100%;
  // background-image: linear-gradient(to left top, blue, red);
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form {
  width: 400px;
  border-radius: 10px;
  transform: translate(0%, 0%);
  padding: 40px;
}
#theme {
  position: fixed;
  top: 15px;
  right: 15px;
}
</style>
