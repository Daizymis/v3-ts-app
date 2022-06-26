import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import LoginView from "../views/LoginView.vue";
import HomeView from "../views/HomeView.vue";
import { UserInfo } from "@/types/user";
import { useUserStoreWithOut } from "@/store/modules/user";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
    // redirect: '/home/order',
    children: [
      {
        path: "order",
        name: "order",
        meta: {
          isShow: true,
          title: "Orders",
          icon: "List",
        },
        component: () => import("@/views/OrderView.vue"),
      },
      {
        path: "good",
        name: "good",
        meta: {
          isShow: true,
          title: "Goods",
          icon: "ShoppingBag",
        },
        component: () => import("@/views/GoodsView.vue"),
      },
    ],
  },
  {
    path: "/personalSet",
    name: "personalSet",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("@/views/PersonalSetView.vue"),
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
