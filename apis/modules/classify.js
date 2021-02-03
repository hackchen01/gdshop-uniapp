export default ( http ) => ({
	list (query = {}) {
		return http.request({
			method: 'GET',
			url: '/classify/list',
			params: query
		})
	},
})