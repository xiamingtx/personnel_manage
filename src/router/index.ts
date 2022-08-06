/*
 * @Description: Description of this file
 * @Version: 2.0
 * @Author: 夏明
 * @Date: 2022-08-06 14:18:16
 * @LastEditors: 夏明
 * @LastEditTime: 2022-08-06 14:18:27
 */
import { createRouter, createWebHashHistory } from "vue-router";

export const menuRoutes = [
  {
    path: "home",
    name: "Home",
    meta: { title: "首页", icon: "home" },
    component: () => import("../views/Home/Index.vue"),
  }
];

const routes = [
  {
    path: "/",
    component: () => import("../views/Layout.vue"),
    redirect: "home",
    children: menuRoutes,
  },
  {
    path: "/403",
    component: () => import("../views/403.vue"),
  },
  {
    path: "/:pathMatch(.*)",
    component: () => import("../views/404.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;