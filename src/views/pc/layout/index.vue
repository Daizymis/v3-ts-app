<template>
    <div  :class="classObj" class="common-layout">
        <el-header>
            <el-row :gutter="20">
                <el-col :span="4">
                    <img
                            width="30"
                            style="transform: translateY(50%)"
                            src="~@/assets/logo.png"
                    />
                    <Expand v-if="isCollapse" class="collapse-icon" @click="handleCollapse"/>
                    <Fold v-if="!isCollapse" class="collapse-icon" @click="handleCollapse"/>
                </el-col>
                <el-col :span="16"><h3>Manage System</h3></el-col>
                <el-col :span="4" class="user-nav">
                    <el-avatar
                            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                            @click="toPersonalSet"
                    />
                    <div class="name-nav" @click="logOut">
                        {{ userName }} <span>退出</span>
                    </div>
                </el-col>
            </el-row>
        </el-header>
        <side-bar  class="sidebar-container" :isCollapse="isCollapse"></side-bar>
        <section class="main-container hasTagsView">
            <div></div>
            <router-view></router-view>
        </section>
    </div>
</template>

<script lang="ts">
    import sideBar from './components/sidebar.vue'
    import { useUser } from "@/hook/useUser";
    import {
        defineComponent,
        computed,
        onBeforeMount,
        ref,
        onMounted,
        getCurrentInstance,
    } from "vue";
    import { useRoute, useRouter } from "vue-router";

    export default defineComponent({
        name: "LayoutView",
        components: {sideBar},
        setup() {
            const router = useRouter();
            const menuList = router.getRoutes().filter((route) => route.meta.isShow);
            const defaultActive = ref(menuList[0].name);
            const {userInfo, logOut:userOut} = useUser();
            let isCollapse = ref(false);
            const handleOpen = (menu: any) => {
                router.push(menu.path);
            };
            const logOut = () => {
                userOut();
                router.push("/login");
            };
            const userName = computed(() => userInfo?.name);
            const toPersonalSet = () => {
                router.push("/personalSet");
            };
            onBeforeMount(() => {
                const route = useRoute();
                defaultActive.value = route.name || "";
            });
            const classObj = computed(()=>{
                return {
                    hideSidebar: isCollapse.value,
                    openSidebar: !isCollapse.value
                }
            })
            onMounted(() => {
                const instance = getCurrentInstance();
            });
            const handleCollapse = () =>{
                isCollapse.value = !isCollapse.value;
            }
            return {
                menuList,
                defaultActive,
                handleOpen,
                logOut,
                userName,
                toPersonalSet,
                isCollapse,
                handleCollapse,
                classObj
            };
        },
    });
</script>
<style lang="scss" scoped>
    @import "../../../assets/css/common.scss";
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
    .common-layout {
        height: 100%;
        position: relative
    }
    .el-header {
        background-color: #545c64;
    }
    h3 {
        color: #ffffff;
    }
    .name-nav {
        font-size: 10px;
        color: #5dacff;
        span {
            color: #e6a23c;
        }
    }
    .user-nav {
        @include pointer;
    }
    @media (-webkit-min-device-pixel-ratio: 1.5) {
        .name-nav {
            width: 100px;
            span {
                color: red;
            }
        }
    }
    .main-container {
        min-height: calc(100% - 60px);
        transition: margin-left .28s;
        margin-left: $sideBarWidth;
        position: relative;
    }
    .hideSidebar {
        .sidebar-container {
            width: 54px !important;
        }

        .main-container {
            margin-left: 54px;
        }
    }
    .collapse-icon {
        width: 30px; height: 30px; margin-right: 8px;
        transform: translateY(50%);
        margin-left: 20px;
    }
</style>
