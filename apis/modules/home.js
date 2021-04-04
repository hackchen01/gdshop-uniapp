export default ( http ) => ({
	login (data = {}) {
		return http.request({
			method: 'POST',
			url: '/login',
			data
		})
	},
	home (query = {}) {
		return http.request({
			method: 'GET',
			url: '/home',
			params: query
		})
	},
	send_vcode (query = {}) {
		return http.request({
			method: 'GET',
			url: '/send_vcode',
			params: query
		})
	},
})