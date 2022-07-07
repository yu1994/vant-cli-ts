<template>
  <demo-block title="基础用法">
    <van-tabs v-model:active="active1" >
      <van-tab title="标题1" >内容1</van-tab>
      <van-tab title="标题2">内容2</van-tab>
    </van-tabs>
  </demo-block>
  <demo-block title="通过名称匹配">
    <van-tabs v-model:active="active2">
      <van-tab :name="0" title="标题1" >内容1</van-tab>
      <van-tab :name="1" title="标题2">内容2</van-tab>
    </van-tabs>
  </demo-block>
  <demo-block title="标签栏滚动">
    <van-tabs v-model:active="active2">
      <template v-for="index in 8" :key="index">
        <van-tab :name="index" :title="`标题${index}`" >内容{{ index }}</van-tab>
      </template>
    </van-tabs>
  </demo-block>
  <demo-block title="标签禁用">
    <van-tabs v-model:active="active2">
      <van-tab :name="0" title="标题1" >内容1</van-tab>
      <van-tab :name="1" title="标题2" disabled>内容2</van-tab>
      <van-tab :name="2" title="标题3">内容3</van-tab>
    </van-tabs>
  </demo-block>
  <demo-block title="样式风格">
    <van-tabs v-model:active="active3" type="card">
      <van-tab :name="0" title="标题1" >内容1</van-tab>
      <van-tab :name="1" title="标题2" >内容2</van-tab>
      <van-tab :name="2" title="标题3">内容3</van-tab>
    </van-tabs>
  </demo-block>
  <demo-block title="点击事件">
    <van-tabs v-model:active="active4" @click-tab="onClickTab">
      <van-tab :name="0" title="标题1">内容1</van-tab>
      <van-tab :name="1" title="标题2">内容2</van-tab>
      <van-tab :name="2" title="标题3">内容3</van-tab>
    </van-tabs>
  </demo-block>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VanTabs from '../../tabs'
import VanTab from '..'

const active1 = ref(0)
const active2 = ref(0)
const active3 = ref(0)
const active4 = ref(0)

const beforeChange= (args) =>{
  console.log(args)
  return true
}

const onClickTab = ({ name, title, event,}) =>{
  console.log( name, title, event)
  alert(name)
}

</script>

<style scoped>

</style>
