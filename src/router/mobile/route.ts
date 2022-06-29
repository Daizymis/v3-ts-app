import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import LoginView from "../views/pc/LoginView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "",
    name: "home",
    component: () => import(`@/views/mobile/LayoutView.vue`),
    // redirect: '/home/order',
    children: [
      {
        path: "/home",
        name: "home",
        meta: {
          isShow: true,
          title: "home page",
          icon: "List",
        },
        component: () => import(`@/views/mobile/HomePageView.vue`),
      },
      {
        path: "/category",
        name: "category",
        meta: {
          isShow: true,
          title: "category",
          icon: "category",
        },
        component: () => import(`@/views/mobile/HomePageView.vue`),
      }
    ],
  },
];

