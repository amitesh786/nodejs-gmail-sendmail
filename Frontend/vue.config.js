module.exports = {
	devServer: {
		proxy: process.env.VUE_APP_BASE_URL
	},
	chainWebpack: config => {
		config.module
			.rule('vue')
			.use('vue-loader')
			.loader('vue-loader')
			.tap(options => {
				options.transformAssetUrls = {
					img: 'src',
					image: 'xlink:href',
					'b-avatar': 'src',
					'b-card': 'img-src',
				};
				return options;
			})
	}
}