
<template>
  <demo-block title="基础用法">
    <van-button
        type="primary"
        text="显示遮罩层"
        style="margin-left: 16px"
        @click="show = true"
    />
    <van-overlay :show="show" @click="show = false" />
  </demo-block>

  <demo-block title="嵌入内容">
    <van-button
        type="primary"
        text="嵌入内容"
        style="margin-left: 16px"
        @click="showEmbedded = true"
    />
    <van-overlay :show="showEmbedded" @click="showEmbedded = false">
      <div class="wrapper">
        <div class="block" />
      </div>
    </van-overlay>
  </demo-block>
</template>
<script setup lang="ts">
import VanButton from '../../button'
import VanOverlay from '..';
import { ref } from 'vue';

const show = ref(false);
const showEmbedded = ref(false);
</script>


<style lang="less">
.demo-overlay {
  background: var(--van-background-color-light);

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 120px;
    height: 120px;
    background-color: var(--van-background-color-light);
    border-radius: 4px;
  }
}
</style>
