export default ( http ) => ({
	mycarts (query = {}) {
		return http.request({
			method: 'GET',
			url: '/cart/my',
			params: query
		})
	},
	save (data = {}) {
		return http.request({
			method: 'POST',
			url: '/cart/save',
			data
		})
	},
	save_selected (data = {}) {
		return http.request({
			method: 'POST',
			url: '/cart/save_selected',
			data
		})
	},
	selected_all (data = {}) {
		return http.request({
			method: 'POST',
			url: '/cart/selected_all',
			data
		})
	},
	test () {
		return 'test'
	}
})