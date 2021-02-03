import Vue from 'vue'
import App from './App'
import Store from '@/store'
import Api from '@/apis'
import router from './router'
import { RouterMount } from 'uni-simple-router'

Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.$store = Store
Vue.prototype.$myRouter = router
Vue.prototype.$api = Api
// 引入全局uView
import uView from 'plugins/uview-ui'
Vue.use(uView);
// 注册全局事件
import globalEvent from './event'

const app = new Vue({
	Store,
    ...App
})

// #ifdef H5
RouterMount(app,'#app');
// #endif

// #ifndef H5
app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
