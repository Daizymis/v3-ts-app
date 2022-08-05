import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import LoginView from "@/views/pc/LoginView.vue";
import { UserInfo } from "@/types/user";
import { useUserStoreWithOut } from "@/store/modules/user";
const isTablet =
  /(?:iPad|PlayBook)/.test(navigator.userAgent) ||
  (/(?:Android)/.test(navigator.userAgent) &&
    !/(?:Mobile)/.test(navigator.userAgent)) ||
  (/(?:Firefox)/.test(navigator.userAgent) &&
    /(?:Tablet)/.test(navigator.userAgent));

const folderUrl =
  /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) &&
  !isTablet == true
    ? "mobile"
    : "pc";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "",
    name: "",
    component: () => import(`@/views/${folderUrl}/LayoutView.vue`),
    // redirect: '/home/order',
    children: [
      {
        path: "/home",
        name: "home",
        meta: {
          isShow: true,
          title: "home page",
          icon: "List",
          footer: "home",
        },
        component: () => import(`@/views/${folderUrl}/HomePageView.vue`),
      },
      {
        path: "order",
        name: "order",
        meta: {
          isShow: true,
          title: "Orders",
          icon: "List",
        },
        component: () => import(`@/views/${folderUrl}/OrderView.vue`),
      },
      {
        path: "/personalSet",
        name: "personalSet",
        component: () => import(`@/views/${folderUrl}/PersonalSetView.vue`),
        meta: {
          isShow: true,
          title: "personalSet",
          icon: "personal",
          footer: "personal",
        },
      },
      {
        path: "/noticeManagement",
        name: "noticeManagement",
        component: () => import(`@/views/${folderUrl}/noticeManagementView.vue`),
        meta: {
          isShow: true,
          title: "noticeManagement",
          icon: "ChatLineRound"
        },
      },
      {
        path: "/build",
        name: "build",
        component: () => import(`@/views/${folderUrl}/build/index.vue`),
        meta: {
          isShow: true,
          title: "build",
          icon: "OfficeBuilding"
        },
      },
    ],
  },
  {
    path: "/personalSet",
    name: "personalSet",
    component: () => import(`@/views/${folderUrl}/PersonalSetView.vue`),
  },
];

export default routes;
