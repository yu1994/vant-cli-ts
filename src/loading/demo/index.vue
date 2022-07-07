<template>
  <demo-block title="加载类型">
    <div class="demo-button-row">
      <van-loading></van-loading>
      <van-loading type="spinner"></van-loading>
    </div>
  </demo-block>
  <demo-block title="自定义颜色">
    <div class="demo-button-row">
      <van-loading color="red"></van-loading>
      <van-loading type="spinner" color="red"></van-loading>
    </div>
  </demo-block>
  <demo-block title="加载文案">
    <div class="demo-button-row">
      <van-loading color="red">加载中</van-loading>
      <van-loading type="spinner" color="red">加载中</van-loading>
    </div>
  </demo-block>
  <demo-block title="自定义大小">
    <div class="demo-button-row">
      <van-loading size="24"></van-loading>
      <van-loading type="spinner" size="24"></van-loading>
    </div>
  </demo-block>
  <demo-block title="垂直排列">
    <div class="demo-button-row">
      <van-loading vertical>加载中</van-loading>
      <van-loading type="spinner" vertical>加载中</van-loading>
    </div>
  </demo-block>
</template>

<script setup lang="ts">
import VanLoading from '..'

</script>

<style scoped>

</style>
