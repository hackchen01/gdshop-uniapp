import http from './service'

const files = require.context('./modules', false, /\.js$/)

let api = {}
files.keys().map(key => {
	api[key.replace(/(\.\/|\.js)/g, '')] = files(key).default(http)
})
export default api
