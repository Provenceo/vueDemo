module.exports = {
	//设置为空打包后不分跟目录还是多级目录
	publicPath: process.env.NODE_ENV === 'production'?'super/':'/',
	//build编译后存放静态文件的目录
	// assetsDir: "touch",
	outputDir: 'touch',
	// build编译后不生成资源MAP文件
	productionSourceMap: false,

	//开发服务,build后的生产模式还需nginx代理
	devServer: {
		open: false, //运行后自动打开游览器
		port: 2800, //挂载端口
		// proxy: {
		// 	'/api': {
		// 		target: 'https://www.fastmock.site/mock/44c807475f7eeba73409792255781935/api',
		// 		ws: true,
		// 		pathRewrite: {
		// 			'^/api': '/'
		// 		}
		// 	}
		// }
	},

	chainWebpack: config => {
		// 移除 prefetch 插件
		config.plugins.delete('preload');
		config.plugins.delete('prefetch');
		config.resolve.alias.set('vue-i18n', 'vue-i18n/dist/vue-i18n.cjs.js');
	},

	configureWebpack: config => {
		//性能提示
		config.performance = {
			hints: false
		}
		config.optimization = {
			splitChunks: {
				chunks: "async",
				automaticNameDelimiter: '~',
				name: true,
				cacheGroups: {
					//第三方库抽离
					vendor: {
						name: "modules",
						test: /[\\/]node_modules[\\/]/,
						priority: -10
					},
					tinymce: {
						name: "tinymce",
						test: /[\\/]node_modules[\\/]tinymce[\\/]/
					},
					echarts: {
						name: "echarts",
						test: /[\\/]node_modules[\\/]echarts[\\/]/
					}
				}
			}
		}
	}

}
