import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "login",
    component: import(/* webpackChunkName: "about" */ "@/views/Login/index.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/detail",
    name: "detail",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "detail" */ "../views/Details/index.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const whiteList = ['/'];
router.beforeEach((to, from, next) => {
  if (whiteList.includes(to.path) || localStorage.getItem('token')) {
    next();
  } else {
    next('/');
  }
});

export default router;
