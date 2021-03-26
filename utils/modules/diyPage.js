import router from '@/router'

export function gotoUrl (_type_id,_link) {
	
	switch (_type_id){
		case '9999':
			// #ifdef MP
			this.$u.toast('小程序不支持')
			// #endif
			// #ifdef H5
			window.location.href = _link
			// #endif
			// #ifdef APP-NVUE
			this.$u.toast('开发中')
			// #endif
			break;
		case '4':
			router.push({name:'goods/list',params:{cid:_link}})
			break;
		case '3':
			router.push({name:'goods/list',params:{cid:_link}})
			break;
		case '2':
			router.push({name:'goods/list',params:{cid:_link}})
			break;
		default:
			router.push({name:'goods/details',params:{id:_link}})
			break;
	}
	//router.push({name:'article/view',params:{type:_type}})
}