export default ( http ) => ({
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