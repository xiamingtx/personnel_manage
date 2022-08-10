<!--
 * @Description: Description of this file
 * @Version: 2.0
 * @Author: 夏明
 * @Date: 2022-08-11 00:14:46
 * @LastEditors: 夏明
 * @LastEditTime: 2022-08-11 00:54:31
-->
<template>
  <q-dialog v-model="show" persistent>
    <q-card style="min-width: 350px; padding: 20px 10px">
      <q-card-section>
        <div class="text-h6">添加用户</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input dense v-model="userModel.nickname" label="昵称" autofocus />
      </q-card-section>

      <div class="q-gutter-sm">
        <q-radio
          keep-color
          v-model="userModel.gender"
          val="MALE"
          label="男"
          color="teal"
        />
        <q-radio
          keep-color
          v-model="userModel.gender"
          val="FEMALE"
          label="女"
          color="orange"
        />
        <q-radio
          keep-color
          v-model="userModel.gender"
          val="UNKNOWN"
          label="未知"
          color="red"
        />
      </div>

      <q-card-actions align="right" class="text-primary">
        <q-btn label="确认" color="primary" @click="update" v-close-popup />
        <q-btn flat label="取消" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import notify from "../../utils/notify.js";
import { updateUser } from "../../api/user";
import { UserUpdateRequest } from "../../types/user";

const show = ref<boolean>(false);
let userModel: UserUpdateRequest = reactive({
  nickname: "",
  gender: "MALE",
});
const userId = ref<string>("");
const emits = defineEmits(["update-success"]);

const update = () => {
  updateUser(userId.value, userModel).then(() => {
    notify.success("更新成功");
    emits("update-success");
  });
};
const showUpdateDialog = () => {
  show.value = true;
};

const updateModel = (id: string, user: UserUpdateRequest) => {
  userId.value = id;
  // 不能直接userModel = user 否则会失去reactive特性
  userModel.gender = user.gender;
  userModel.nickname = user.nickname;
};

//将方法暴露出
defineExpose({ showUpdateDialog, updateModel });
</script>

<style scoped></style>
