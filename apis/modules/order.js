export default ( http ) => ({
	create (data = {}) {
		return http.request({
			method: 'POST',
			url: '/order/create',
			data
		})
	},
	submit (data = {}) {
		return http.request({
			method: 'POST',
			url: '/order/submit',
			data
		})
	},
	list (query = {}) {
		return http.request({
			method: 'GET',
			url: '/order/list',
			params:query
		})
	},
	test () {
		return 'test'
	}
})