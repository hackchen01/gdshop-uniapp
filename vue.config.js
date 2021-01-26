const TransformPages = require('uni-read-pages')
const {webpack} = new TransformPages()

module.exports = {
	// 配置路径别名
	configureWebpack: {
		devServer: {
			disableHostCheck: true
		},
		plugins: [
			new webpack.DefinePlugin({
				ROUTES: webpack.DefinePlugin.runtimeValue(() => {
					const tfPages = new TransformPages({
						includes: ['path', 'name', 'meta','aliasPath','guest']
					});
					return JSON.stringify(tfPages.routes)
				}, true )
			})
		]
	},
	transpileDependencies: [
		'uni-simple-router'
	]
}
