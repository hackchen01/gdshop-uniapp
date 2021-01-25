export default ( http ) => ({
	area (query = {}) {
		return http.request({
			method: 'GET',
			url: '/area',
			params: query
		})
	}
})