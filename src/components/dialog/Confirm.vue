<!--
 * @Description: Description of this file
 * @Version: 2.0
 * @Author: 夏明
 * @Date: 2022-08-09 18:08:41
 * @LastEditors: 夏明
 * @LastEditTime: 2022-08-10 22:34:14
-->
<template>
  <q-dialog v-model="confirm" persistent>
    <q-card>
      <q-card-section class="row items-center" style="width: 300px">
        <q-avatar icon="check" color="primary" text-color="white" />
        <span class="q-ml-lg">{{ props.title }}</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="取消" color="primary" v-close-popup />
        <q-btn
          flat
          label="确定"
          color="primary"
          v-close-popup
          @click="onConfirm"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  title: string;
}>();

const emits = defineEmits(["onConfirm"]);

const confirm = ref<boolean>(false);

const toggleConfirm = () => {
  confirm.value = !confirm.value;
};

const onConfirm = () => {
  emits("onConfirm");
};
//将方法暴露出
defineExpose({ toggleConfirm });
</script>

<style lang=""></style>
