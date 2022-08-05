import {  RouteRecordRaw } from "vue-router";
import LoginView from "@/views/pc/LoginView.vue";

const folderUrl = 'mobile'
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
          path: "good",
          name: "good",
          meta: {
            isShow: true,
            title: "Goods",
            icon: "ShoppingBag",
          },
          component: () => import(`@/views/${folderUrl}/GoodsView.vue`),
        },
      {
        path: "/category",
        name: "category",
        meta: {
          isShow: true,
          title: "category",
          icon: "List",
          footer: "category",
        },
        component: () => import(`@/views/${folderUrl}/CategoryView.vue`),
      },
      {
        path: "/message",
        name: "message",
        meta: {
          isShow: true,
          title: "message",
          icon: "List",
          footer: "message",
        },
        component: () => import(`@/views/${folderUrl}/MessageView.vue`),
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
        path: "/shopCart",
        name: "shopCart",
        component: () => import(`@/views/${folderUrl}/shopCartView.vue`),
        meta: {
          isShow: true,
          title: "shopCart",
          icon: "shopCart",
          footer: "cart",
        },
      }
    ],
  },
  {
    path: "/orders",
    name: "orders",
    component: () => import(`@/views/${folderUrl}/OrdersView.vue`),
  },
  {
    path: "/gooddetail/:id",
    name: "gooddetail",
    component: () => import(`@/views/${folderUrl}/GoodDetail.vue`),
    beforeEnter: (to, from ,next)=>{
      console.log(to, from ,next);
      next();
    }
  },
];
export default routes;