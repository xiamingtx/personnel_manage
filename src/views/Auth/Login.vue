<!--
 * @Description: Description of this file 
 * @Version: 2.0
 * @Author: 夏明
 * @Date: 2022-08-06 16:29:04
 * @LastEditors: 夏明
 * @LastEditTime: 2022-08-08 11:45:04
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
              v-model="userLoginRequest.username"
              label="请输入用户名"
              hint="用户名"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || '您还未输入用户名!']"
            />

            <q-input
              filled
              type="password"
              v-model="userLoginRequest.password"
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
import { ref, reactive } from "vue";
import { login } from "../../api/auth";
import { UserLoginRequest } from "../../types/auth";
import { useRouter } from "vue-router";
import notify from "../../utils/notify";
import { useDevStore } from "../../store/index";

const remember = ref(false);
const userLoginRequest: UserLoginRequest = reactive({
  username: "",
  password: "",
});
const router = useRouter();
const store = useDevStore();

const onSubmit = () => {
  store.login(userLoginRequest).then((res) => {
    notify.success("登录成功");
    store.me().then(() => {
      router.push("/");
    });
  });
};

const onReset = () => {
  userLoginRequest.username = userLoginRequest.password = "";
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
