import router from '@/router'

export function gotoLogin () {
	router.push({name:'index/login'})
}

export function gotoGoodsDetails (_goodsId) {
	router.push({name:'goods/details', params: { id: _goodsId }})
}