import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import LoginView from "../views/pc/LoginView.vue";
import { UserInfo } from "@/types/user";
import { useUserStoreWithOut } from "@/store/modules/user";
import mobileRoutes from './mobile/route'
import pcRoutes from './pc/index'
const isTablet =
  /(?:iPad|PlayBook)/.test(navigator.userAgent) ||
  (/(?:Android)/.test(navigator.userAgent) &&
    !/(?:Mobile)/.test(navigator.userAgent)) ||
  (/(?:Firefox)/.test(navigator.userAgent) &&
    /(?:Tablet)/.test(navigator.userAgent));

const routesConfig =
  /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) &&
  !isTablet == true
    ? mobileRoutes
    : pcRoutes;
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
  },
  ...routesConfig,
  {
    path: "/notFound",
    name: "notFound",
    component: () => import(`@/views/notFound.vue`)
  },
  {
    path: '/:pathMatch(.*)', // 此处需特别注意至于最底部
    redirect: '/notFound'
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (!router.hasRoute(to.path)) {
    next() ;
  }
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
  } else if (token && (to.path == "/login" || to.path == "/")) {
    return "/home";
  }
});
router.afterEach((to, from)=>{
  console.log(to,from)
})

export default router;
