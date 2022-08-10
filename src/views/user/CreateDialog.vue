<!--
 * @Description: Description of this file
 * @Version: 2.0
 * @Author: 夏明
 * @Date: 2022-08-10 22:26:42
 * @LastEditors: 夏明
 * @LastEditTime: 2022-08-10 22:38:56
-->
<template>
  <q-dialog v-model="show" persistent>
    <q-card style="min-width: 350px; padding: 20px 10px">
      <q-card-section>
        <div class="text-h6">添加用户</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input dense v-model="userModel.username" label="用户名" autofocus />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          type="password"
          dense
          v-model="userModel.password"
          label="密码"
          autofocus
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn label="确认" color="primary" @click="createUser" v-close-popup />
        <q-btn flat label="取消" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import notify from "../../utils/notify.js";
import { addUser } from "../../api/user";
import { UserCreateRequest } from "../../types/user";

const show = ref<boolean>(false);
const userModel: UserCreateRequest = reactive({
  username: "",
  password: "",
});
const emits = defineEmits(["create-success"]);
const createUser = () => {
  addUser(userModel).then(() => {
    notify.success("用户创建成功");
    emits("create-success");
  });
};
const showCreateDialog = () => {
  show.value = true;
};

//将方法暴露出
defineExpose({ showCreateDialog });
</script>

<style scoped></style>
