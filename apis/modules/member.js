export default ( http ) => ({
	login (query = {}) {
		return http.request({
			method: 'POST',
			url: '/configs/get_pager',
			params: query
		})
	},
	test () {
		return 'test'
	}
})