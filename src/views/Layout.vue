<!--
 * @Description: Description of this file
 * @Version: 2.0
 * @Author: 夏明
 * @Date: 2022-08-06 12:43:21
 * @LastEditors: 夏明
 * @LastEditTime: 2022-08-08 11:50:56
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
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useDevStore } from "../store/index";
import { useRouter  } from "vue-router";

const leftDrawerOpen = ref(false);
const store = useDevStore();

const toggleLeftDrawer = (): void => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const logout = () => {
  store.logout().then(() => {
    window.location.reload();
  })
}
</script>

<style scoped lang="scss"></style>
