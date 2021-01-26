export default ( http ) => ({
	login (data = {}) {
		return http.request({
			method: 'POST',
			url: '/login',
			data
		})
	},
})