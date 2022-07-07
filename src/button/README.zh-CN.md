# Button 按钮

### 介绍

按钮用于触发一个操作，如提交表单。

### 引入

通过以下方式来全局注册组件，更多注册方式请参考[组件注册](#/zh-CN/advanced-usage#zu-jian-zhu-ce)。

```js
import { createApp } from 'vue';
import { Button } from 'vant';

const app = createApp();
app.use(Button);
```

## 代码演示

### 按钮类型

按钮支持 `default`、`primary`、`success`、`warning`、`danger` 五种类型，默认为 `default`。

```html
<van-button type="primary">主要按钮</van-button>
<van-button type="success">成功按钮</van-button>
<van-button type="default">默认按钮</van-button>
<van-button type="warning">警告按钮</van-button>
<van-button type="danger">危险按钮</van-button>
```
