export default ( http ) => ({
	list (query = {}) {
		return http.request({
			method: 'GET',
			url: '/address/list',
			params: query
		})
	},
	details (query = {}) {
		return http.request({
			method: 'GET',
			url: '/address/details',
			params: query
		})
	},
	add (data = {}) {
		return http.request({
			method: 'POST',
			url: '/address/add',
			data
		})
	},
	save (data = {}) {
		return http.request({
			method: 'POST',
			url: '/address/save',
			data
		})
	},
	del (query = {}) {
		return http.request({
			method: 'GET',
			url: '/address/del',
			params: query
		})
	},
	test () {
		return 'test'
	}
})