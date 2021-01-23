export default ( http ) => ({
	details (query = {}) {
		return http.request({
			method: 'GET',
			url: '/goods/details',
			params: query
		})
	},
	content (query = {}) {
		return http.request({
			method: 'GET',
			url: '/goods/content',
			params: query
		})
	},
	test () {
		return 'test'
	}
})