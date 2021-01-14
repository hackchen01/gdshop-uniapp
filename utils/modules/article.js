import router from '@/router'

export function gotoArticle (_type) {
	router.push({name:'article/view',params:{type:_type}})
}