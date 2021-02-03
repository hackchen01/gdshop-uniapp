// 全局事件全部写在这里
import Store from '@/store'

uni.$on('CART_COUNT_CHANGE',function(count){
	const cartIndex = 2
	Store.commit('setCartCount',count)
	if (count > 0){
		uni.setTabBarBadge({
		  index: cartIndex,
		  text: count.toString()
		})
	}
	else{
		uni.removeTabBarBadge({index:cartIndex})
	}
})