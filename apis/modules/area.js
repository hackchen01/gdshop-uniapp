export default ( http ) => ({
	area (query = {}) {
		return http.request({
			method: 'GET',
			url: '/area',
			params: query
		})
	},
	pcas (query = {}) {
		return http.request({
			method: 'GET',
			url: '/pcas',
			params: query
		})
	},
})