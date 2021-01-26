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
	test () {
		return 'test'
	}
})