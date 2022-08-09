/*
 * @Description: Description of this file
 * @Version: 2.0
 * @Author: 夏明
 * @Date: 2022-08-06 14:18:16
 * @LastEditors: 夏明
 * @LastEditTime: 2022-08-09 10:51:42
 */
import { createRouter, createWebHashHistory } from "vue-router";

export const menuRoutes = [
  {
    path: "home",
    name: "Home",
    meta: { title: "首页", icon: "home" },
    component: () => import("../views/home/Index.vue"),
  },
  {
    path: 'user',
    name: 'User',
    meta: { title: '用户管理', icon: 'manage_accounts' },
    component: () => import('../views/user/Index.vue')
  },
];

const routes = [
  {
    path: "/",
    component: () => import("../views/Layout.vue"),
    redirect: "home",
    children: menuRoutes,
  },
  {
    path: "/login",
    component: () => import("../views/auth/Login.vue")
  },
  {
    path: "/register",
    component: () => import("../views/auth/Register.vue")
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