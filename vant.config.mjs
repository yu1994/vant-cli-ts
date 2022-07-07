export default {
  name: 'vant',
  build: {
    srcDir: 'src',
    namedExport: true,
    skipInstall: ['lazyload'],
    packageManager: 'yarn',
    site: {
      publicPath:
        (typeof window === 'undefined' && process.env.PUBLIC_PATH) || '/vant/',
    },
    vetur: {
      tagPrefix: 'van-',
    },
    configureVite(config) {
      config.server.port = 3001
      return config
    },
  },
  site: {

    defaultLang: 'zh-CN',
    hideSimulator: false,
    versions: [
      { label: 'v1', link: '/vant/v1/' },
      { label: 'v2', link: '/vant/v2/' },
      { label: 'v4', link: '/vant/v4/' },
    ],
    baiduAnalytics: {
      seed: 'ad6b5732c36321f2dafed737ac2da92f',
    },
    htmlMeta: {
      'docsearch:version': 'v3',
    },
    locales: {
      'zh-CN': {
        title: 'Vant 3',
        subtitle: '（适用于 Vue 3）',
        description: '轻量、可靠的移动端组件库',
        logo: 'https://img.yzcdn.cn/vant/logo.png',
        langLabel: '中',
        links: [
          {
            logo: 'https://b.yzcdn.cn/vant/logo/weapp.svg',
            url: 'https://vant-contrib.gitee.io/vant-weapp/',
          },
          {
            logo: 'https://b.yzcdn.cn/vant/logo/github.svg',
            url: 'https://github.com/youzan/vant',
          },
        ],
        searchConfig: {
          apiKey: '90067aecdaa2c85220e2783cd305caac',
          indexName: 'vant',
          searchParameters: {
            facetFilters: ['lang:zh-CN', 'version:v3'],
          },
          transformItems(items) {
            if (location.hostname !== 'youzan.github.io') {
              items.forEach((item) => {
                if (item.url) {
                  item.url =
                    item.url &&
                    item.url.replace('youzan.github.io', location.hostname);
                }
              });
            }
            return items;
          },
        },
        nav: [
          {
            title: '开发指南',
            items: [
              {
                path: 'home',
                title: '介绍',
              },{
                path: 'test',
                title: '测试',
              }
            ],
          },
          {
            title: '基础组件',
            items: [
              {
                path: 'button',
                title: 'Button 按钮'
              },
              {
                path: 'popup',
                title: 'Popup 弹出层'
              },
            ]
          },
          {
          title: '反馈组件',
            items: [
              {
                path: 'loading',
                title: 'Loading 加载'
              },{
                path: 'overlay',
                title: 'Overlay 遮罩层'
              },{
                path: 'dialog',
                title: 'Dialog 弹出框'
              }
            ]
          },
          {
            title: '展示组件',
            items: [
              {
                path: 'swipe',
                title: 'swipe 轮播',
              }
            ]
          },
          {
            title: '导航组件',
            items: [
              {
                path: 'tab',
                title: 'Tab 标签页',
              }
            ],
          },
        ],
      },
    },
  },
};
