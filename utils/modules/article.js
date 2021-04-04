import router from '@/router'

export function gotoArticle (_type) {
	router.push({name:'article/view',params:{type:_type}})
}

export function gotoArticlePrivacyPolicy () {
	console.log('gotoArticlePrivacyPolicy')
	router.push({name:'index/article',params:{type:'privacy_policy'}})
}
export function gotoArticleAgreement () {
	console.log('gotoArticleAgreement')
	router.push({name:'index/article',params:{type:'agreement'}})
}