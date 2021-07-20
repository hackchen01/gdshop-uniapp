export default ( http ) => ({
	index (query = {}) {
		return http.request({
			method: 'GET',
			url: '/coupon/index',
			params: query
		})
	},
	receive (query = {}) {
		return http.request({
			method: 'GET',
			url: '/coupon/receive',
			params: query
		})
	},
})