<!--
 * @Description: Description of this file
 * @Version: 2.0
 * @Author: 夏明
 * @Date: 2022-08-06 12:43:21
 * @LastEditors: 夏明
 * @LastEditTime: 2022-08-09 00:02:56
-->
<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> 人员管理系统 </q-toolbar-title>
        <q-space />
        <q-avatar color="teal" text-color="white">
          {{ store.nicknameFirstWord }}
          <q-menu fit>
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup @click="logout">
                <q-item-section>退出</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-avatar>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <q-list padding class="text-primary">
        <q-item
          clickable
          v-ripple
          active-class="menu-active"
          v-for="item in menuRoutes"
          :key="item.meta.title"
          :active="item.name === route.name"
          :to="item.path"
        >
          <q-item-section avatar>
            <q-icon :name="item.meta.icon" />
          </q-item-section>

          <q-item-section>{{ item.meta.title }}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useDevStore } from "../store/index";
import { useRoute } from "vue-router";
import { menuRoutes } from "../router";

const leftDrawerOpen = ref(false);
const store = useDevStore();
const route = useRoute();

const toggleLeftDrawer = (): void => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const logout = () => {
  store.logout().then(() => {
    window.location.reload();
  });
};
</script>

<style scoped lang="scss">
.menu-active{
  color: white;
  background: #F2C037;
}
</style>
