## gdshop 商城 uniapp 版

基于uviewUI 1.x 开发的商城

包含基本商城所需的界面，后面会继续完善

## 用到的组件
1. uviewUI做基础UI框架
1. uni-simple-router 做路由管理
1. uni-read-pages 自动构建路由表
1. luch-request 做请求管理
1. vk-u-goods-sku-popup 商品详情SKU弹窗
1. zhouWei-navBar 自定义头部
1. HM-filterDropdown 下来筛选组件


## 适配测试

1. H5
1. 微信小程序

## 目录结构
```
├─apis // API统一管理目录
│  └─modules // API模块目录
├─components // 自己开发的组件
├─node_modules // node依赖包
├─pages // 页面目录
│  ├─article
│  ├─cart
│  ├─center
│  ├─classify
│  ├─coupon
│  ├─goods
│  ├─index
│  ├─member
│  ├─order
│  └─vuex_test
├─plugins // 外部引用的插件
│  ├─luch-request
│  ├─uni-number-box
│  ├─uview-ui 
│  ├─vk-u-goods-sku-popup
│  ├─vk-u-number-box
│  └─zhouWei-navBar
├─router // 路由统一管理目录
├─static // 静态资源目录，除非必要墙裂建议放到外部加载
│  ├─css // 存放样式
│  ├─icon // 存放图标
│  └─images // 存放图片
│      └─tabber
├─store // vuex 目录
│  └─modules // vuex 模块
└─utils // 自己写的工具方法
    └─modules // 工具方法模块

```

## 安装使用

1. 下载、解压
1. 在项目根目录运行 npm install ，安装node依赖包
2. 使用 HBuilderX 打开即可运行

## 感谢

1. uniapp
1. uviewUI
1. uni-simple-router
1. uni-read-pages
1. luch-request
1. vk-u-goods-sku-popup
1. zhouWei-navBar
1. HM-filterDropdown
