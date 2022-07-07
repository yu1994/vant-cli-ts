<template>
  <demo-block title="按钮类型">
    <div class="demo-button-row">
      <van-button type="primary" text="主要按钮" @click="onClick">
      </van-button>
      <van-button type="primary"  @click="onClick">
        <span>主要按钮11</span>
      </van-button>
      <van-button type="success" text="成功按钮"></van-button>
    </div>
    <div class="demo-button-row">
      <van-button type="default" text="默认按钮"></van-button>
      <van-button type="warning" text="警告按钮"></van-button>
      <van-button type="danger" text="危险按钮"></van-button>
    </div>
  </demo-block>
  <demo-block title="禁用状态">
    <van-button type="primary" text="禁用状态" disabled>
    </van-button>
  </demo-block>
  <demo-block title="朴素按钮">
    <van-button plain type="primary" text="朴素按钮" />
    <van-button plain type="success" text="朴素按钮" />
  </demo-block>
  <demo-block title="加载状态">
    <van-button loading type="primary" />
    <van-button  loading type="success" loading-text="加载中..." />
  </demo-block>
  <demo-block title="按钮形状">
    <van-button square type="primary">方形按钮</van-button>
    <van-button round type="primary">圆形按钮</van-button>
  </demo-block>
  <demo-block title="按钮尺寸">
    <van-button type="primary" size="large">大号按钮</van-button>
    <van-button type="primary" size="normal">普通按钮</van-button>
    <van-button type="primary" size="small">小型按钮</van-button>
    <van-button type="primary" size="mini">迷你按钮</van-button>
  </demo-block>
  <demo-block title="块级元素">
    <van-button type="primary" block>块级元素</van-button>
  </demo-block>
  <demo-block title="页面导航">
    <van-button type="primary" url="https://baidu.com" @click="onClick">URL 跳转</van-button>
    <van-button type="primary" to="index">路由跳转</van-button>
  </demo-block>
  <demo-block title="自定义颜色">
    <van-button color="#7232dd">单色按钮</van-button>
    <van-button color="#7232dd" plain>单色按钮</van-button>
    <van-button color="linear-gradient(to right, #ff6034, #ee0a24)">
      渐变色按钮
    </van-button>
  </demo-block>

</template>

<script setup lang="ts">
import {ButtonHTMLAttributes} from 'vue'
import VanButton from '..'

type ButtonNativeType = NonNullable<ButtonHTMLAttributes['type']>;

const buttonTypes: ButtonNativeType = 'button'

 function onClick() {
  console.log(buttonTypes)
  console.log('buttonType')
}
</script>

<style lang="less">
.demo-button {
  background: var(--van-background-color-light);

  .van-button {
    &--large {
      margin-bottom: var(--van-padding-md);
    }

    &--small,
    &--normal:not(:last-child) {
      margin-right: var(--van-padding-md);
    }
  }

  .van-doc-demo-block {
    padding: 0 var(--van-padding-md);
  }

  .van-doc-demo-block__title {
    padding-left: 0;
  }

  &-row {
    margin-bottom: var(--van-padding-sm);
  }
}
</style>
