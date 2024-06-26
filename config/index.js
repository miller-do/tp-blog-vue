'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/index.php/admin': {// 'api'就等于target,该api可以自定义，比如写成abc，但同时下方的/^api也要改成/^abc了
			// target:"http://localhost/tp-blog/public/index.php/api/common/",// 服务器的接口地址，即你要访问的真实地址,http或者https都可以
			target:"http://tpyycms.cn",// 目标接口域名 "http://localhost/tp-yycms/public/index.php/admin/",
			// 服务器的接口地址，即你要访问的真实地址,http或者https都可以
			// target:"localhost",//代表监测到以 /api 开头的接口后，把axios请求中前面的本地服务器地址改为后端接口地址，实际发送给后端的请求就是下方后一个请求
			//如果target配置的是http://XX.XX.XX.XX:8081/abc/def   http://localhost:8080/abc/def --> http://XX.XX.XX.XX:8081/abc/def
			ws:false,//开启websocket
			changeOrigin: true,
			logLevel: 'debug',//调试时，可以输出代理后的真实地址是什么，上线时注释掉即可
			secure: true,//当是https的时候改成false
			pathRewrite: {
				'^/index.php/admin': '/', //留空, 代表你在axios里的请求'/api/info' = http://localhost:54321/info
				// '/^api': '/api',//重写, 代表你在axios里的请求'/api/info' = http://localhost:54321/api/info 有统一的项目名api的
			},
			
			//这里理解成用‘/api’代替target里面的地址，
			//后面组件中我们调接口时直接用api代替 
			//比如我要调用'http://40.00.100.100:3002/user/add',
			//直接写‘/api/user/add’即可
		},
		'/api': {//测试环境
			target: "http://tpyycms.cn/index.php/admin", 
			ws: false, //开启websocket
			changeOrigin: true,
			logLevel: 'debug', 
			secure: true, //当是https的时候改成false
			pathRewrite: {
				'^/api': '/', 
			},
		},
		//监测多个接口如下
		'/admin': {
			target: "http://81.71.15.166", 
			ws: false, //开启websocket
			changeOrigin: true,
			logLevel: 'debug', 
			secure: true, //当是https的时候改成false
			pathRewrite: {
				'^/admin': '/admin', 
			},
		},
		
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    
    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
