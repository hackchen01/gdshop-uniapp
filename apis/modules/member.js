export default ( http ) => ({
	index (query = {}) {
		return http.request({
			method: 'GET',
			url: '/member/index',
			params: query
		})
	},
	login (data = {}) {
		return http.request({
			method: 'POST',
			url: '/login',
			data
		})
	},
	layout () {
		return http.request({
			method: 'GET',
			url: '/layout'
		})
	},
})