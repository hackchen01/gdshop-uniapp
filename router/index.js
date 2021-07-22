
import Vue from 'vue'
//这里仅示范npm安装方式的引入，其它方式引入请看最上面【安装】部分
import Router from 'uni-simple-router'
import store from '@/store/index'
Vue.use(Router)

//初始化
const router = new Router({
    encodeURI:true,
    h5:{
        paramsToQuery:true,
    },
    routes: ROUTES //路由表
});

const updateCartCountRouters = [
	'index/index',
	'classify/index',
	'member/index',
]

//全局路由前置守卫
router.beforeEach((to, from, next) => {
	if(to.guest === true){
		if(store.state.memberToken.length > 0){
			// 已登录，可尝试获取购物车数量
			if (updateCartCountRouters.includes(to.name)){
				store.dispatch('getCartCount')
			}
		}
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
			// 已登录，可尝试获取购物车数量
			if (updateCartCountRouters.includes(to.name)){
				store.dispatch('getCartCount')
			}
			next()
		}
	}
})
// 全局路由后置守卫
router.afterEach((to, from) => {
})
export default router;
