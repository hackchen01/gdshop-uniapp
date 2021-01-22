export default ( http ) => ({
	details (query = {}) {
		return http.request({
			method: 'GET',
			url: '/goods/details',
			params: query
		})
	},
	test () {
		return 'test'
	}
})