// setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api', {  //`api`是需要转发的请求 
            target: 'https://movie.douban.com',  // 这里是接口服务器地址
            changeOrigin: true,
            // secure: false
        })
    )
}