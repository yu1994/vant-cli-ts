<template>
  <demo-block card title="基础用法">
    <van-button block @click="showBasic = true">展示弹出层</van-button>
    <van-popup
        v-model:show="showBasic"
        :style="{ padding: '30px 50px' }"
        @click-overlay="onclick"
    >
    <div>内容</div>
    </van-popup>
  </demo-block>
  <demo-block card title="弹出位置">
    <van-button block text="顶部弹出" is-link @click="showTop = true" />
    <van-button block text="低部弹出" is-link @click="showBottom = true" />
    <van-button block text="左侧弹出" is-link @click="showLeft = true" />
    <van-button block text="右侧弹出" is-link @click="showRight = true" />

    <van-popup
        v-model:show="showTop"
        position="top"
        :style="{ height: '30%' }"
    />
    <van-popup
        v-model:show="showBottom"
        position="bottom"
        :style="{ height: '30%' }"
    />
    <van-popup
        v-model:show="showLeft"
        position="left"
        :style="{ width: '30%', height: '100%' }"
    />
    <van-popup
        v-model:show="showRight"
        position="right"
        :style="{ width: '30%', height: '100%' }"
    />
  </demo-block>
</template>

<script setup lang="ts">
import VanButton from '../../button'
import VanPopup from '..';
import {ref} from 'vue'

const showBasic = ref(false)
const showTop = ref(false);
const showBottom = ref(false);
const showLeft = ref(false);
const showRight = ref(false);

const onclick =()=>{
  console.log('1')
}
</script>

<style scoped>

</style>
