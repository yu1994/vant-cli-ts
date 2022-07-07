<template>
<demo-block card title="基础用法">
  <van-button block type="primary" @click="onClickAlert">提示弹窗</van-button>
</demo-block>
</template>

<script lang="ts" setup>
import VanButton from '../../button'
import { Dialog } from '..';
const onClickAlert = () => {
  Dialog.alert({
    title: '标题',
    message: '代码是写出来给人看的，附带能在机器上运行。',
  });
};
</script>

<style lang="less">
.demo-dialog {
  img {
    box-sizing: border-box;
    width: 100%;
    padding: 25px 20px 0;
  }
}
</style>
