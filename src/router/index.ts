import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import LoginView from "../views/pc/LoginView.vue";
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
      //   {
      //     path: "order",
      //     name: "order",
      //     meta: {
      //       isShow: true,
      //       title: "Orders",
      //       icon: "List",
      //     },
      //     component: () => import(`@/views/${folderUrl}/OrderView.vue`),
      //   },
      //   {
      //     path: "order",
      //     name: "order",
      //     meta: {
      //       isShow: true,
      //       title: "Orders",
      //       icon: "List",
      //     },
      //     component: () => import(`@/views/${folderUrl}/OrderView.vue`),
      //   },
      //   {
      //     path: "good",
      //     name: "good",
      //     meta: {
      //       isShow: true,
      //       title: "Goods",
      //       icon: "ShoppingBag",
      //     },
      //     component: () => import(`@/views/${folderUrl}/GoodsView.vue`),
      //   },
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
    ],
  },
  {
    path: "/personalSet",
    name: "personalSet",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(`@/views/${folderUrl}/PersonalSetView.vue`),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to) => {
  const token: string | null = localStorage.getItem("token");
  const user: UserInfo | null = JSON.parse(
    localStorage.getItem("user") || "{}"
  );
  const userStore = useUserStoreWithOut();
  if (token) {
    userStore.setToken(token);
    userStore.setUserInfo(user);
  }
  if (!token && to.path !== "/login") {
    return "/login";
  } else if (token && to.path == "/login") {
    return "/home";
  }
});

export default router;
