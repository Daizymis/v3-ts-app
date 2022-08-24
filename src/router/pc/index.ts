import { defineAsyncComponent } from "vue";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    component: () => import(`@/views/pc/LoginView.vue`),
  },
  {
    path: "",
    name: "",
    component: () => import(`@/views/pc/LayoutView.vue`),
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
        component: () => import(`@/views/pc/HomePageView.vue`),
      },
      {
        path: "order",
        name: "order",
        meta: {
          isShow: true,
          title: "Orders",
          icon: "List",
        },
        component: () => import(`@/views/pc/OrderView.vue`),
      },
      {
        path: "/noticeManagement",
        name: "noticeManagement",
        component: () => defineAsyncComponent(()=>import( /* @vite-ignore */ `@/views/pc/noticeManagementView.vue`)),
        meta: {
          isShow: true,
          title: "noticeManagement",
          icon: "ChatLineRound"
        },
      },
      {
        path: "/build",
        name: "build",
        component: () => import(/* @vite-ignore */`@/views/pc/build/index.vue`),
        meta: {
          isShow: true,
          title: "build",
          icon: "OfficeBuilding"
        },
      },
      {
        path: "/cartoon",
        name: "cartoon",
        component: () => import(`@/views/pc/CartoonShowView.vue`),
        meta: {
          isShow: true,
          title: "cartoon",
          icon: "OfficeBuilding"
        },
      },
    ],
  },
  {
    path: "/personalSet",
    name: "personalSet",
    component: () => import(/* @vite-ignore */`@/views/pc/PersonalSetView.vue`),
  },
];

export default routes;
