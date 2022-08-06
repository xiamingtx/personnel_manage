<!--
 * @Description: Description of this file 
 * @Version: 2.0
 * @Author: 夏明
 * @Date: 2022-08-06 16:29:04
 * @LastEditors: 夏明
 * @LastEditTime: 2022-08-06 19:34:17
-->
<template>
  <div class="login-form">
    <q-card class="login-form-card">
      <div class="login-card-header">登录</div>
      <q-card-section>
        <div class="q-pa-md" style="width: 22vw">
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input
              filled
              v-model="name"
              label="请输入用户名"
              hint="用户名"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || '您还未输入用户名!']"
            />

            <q-input
              filled
              type="password"
              v-model="password"
              label="请输入密码"
              hint="密码"
              lazy-rules
              :rules="[
                (val) => (val !== null && val !== '') || '密码不能为空!',
                (val) =>
                  (val.length >= 6 && val.length <= 20) ||
                  '密码必须在6-20个字符间',
              ]"
            />

            <q-toggle v-model="remember" label="记住我" />

            <div class="login-buttons">
              <q-btn label="登录" type="submit" color="primary" />
              <q-btn
                label="重置"
                type="reset"
                color="primary"
                flat
                class="q-ml-sm"
              />
            </div>
          </q-form>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { getToken } from "../../api/auth";

const name = ref("");
const password = ref("");
const remember = ref(false);

const onSubmit = () => {
  getToken(name.value, password.value).then((res) => {
    console.log(res);
  });
};

const onReset = () => {
  name.value = "";
  password.value = "";
  remember.value = false;
};
</script>

<style lang="scss" scoped>
.login-form {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #c2e59c; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to left,
    #64b3f4,
    #c2e59c
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to left,
    #64b3f4,
    #c2e59c
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  .login-form-card {
    display: flex;
    flex-direction: column;
    padding: 10px 20px;
    .login-card-header {
      text-align: center;
      font-size: 24px;
      padding-top: 5px;
    }
    .login-buttons {
      text-align: center;
    }
  }
}
</style>
