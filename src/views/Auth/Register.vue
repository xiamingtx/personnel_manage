<!--
 * @Description: Description of this file
 * @Version: 2.0
 * @Author: 夏明
 * @Date: 2022-08-06 19:29:03
 * @LastEditors: 夏明
 * @LastEditTime: 2022-08-06 21:28:08
-->
<template>
  <div class="register-form">
    <q-card class="register-form-card">
      <div class="register-card-header">注册</div>
      <q-card-section>
        <div class="q-pa-md" style="width: 25vw">
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

            <q-input
              filled
              v-model="mobile"
              label="请输入邮箱"
              hint="邮箱"
              lazy-rules
              :rules="[
                (val) => (val !== null && val !== '') || '邮箱不能为空!'
              ]"
            />

            <div class="verify-code">
              <q-input
                filled
                v-model="verifyCode"
                label="请输入验证码"
                hint="验证码"
                lazy-rules
                :rules="[
                  (val) => (val !== null && val !== '') || '验证码不能为空!',
                ]"
              />
              <q-btn
                class="verify-code-btn"
                color="primary"
                label="获取验证码"
              />
            </div>

            <div class="register-buttons">
              <q-btn label="注册" type="submit" color="primary" />
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

const name = ref("");
const password = ref("");
const verifyCode = ref("");
const mobile = ref("");

const onSubmit = () => {};

const onReset = () => {
  name.value = "";
  password.value = "";
};
</script>

<style lang="scss" scoped>
.register-form {
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

  .register-form-card {
    display: flex;
    flex-direction: column;
    padding: 10px 20px;
    .register-card-header {
      text-align: center;
      font-size: 24px;
      padding-top: 5px;
    }
    .register-buttons {
      text-align: center;
    }
    .verify-code {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      .verify-code-btn {
        margin-bottom: 20px;
        margin-right: 10px;
      }
    }
  }
}
</style>
