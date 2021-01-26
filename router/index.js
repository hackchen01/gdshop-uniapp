
import Vue from 'vue'
//这里仅示范npm安装方式的引入，其它方式引入请看最上面【安装】部分
import Router from 'uni-simple-router'
import store from '@/store/index'
Vue.use(Router)

//初始化
const router = new Router({
    encodeURI:false,
    h5:{
        paramsToQuery:true,
    },
    routes: ROUTES //路由表
});

//全局路由前置守卫
router.beforeEach((to, from, next) => {
	if(to.guest === true){
		next()
	}
	else {
		if(store.state.memberToken.length < 1){
			next({
				name: 'index/login',
				params: {},
				NAVTYPE: 'push'
			});
		}
		else{
			next()
		}
	}
})
// 全局路由后置守卫
router.afterEach((to, from) => {
})
export default router;
