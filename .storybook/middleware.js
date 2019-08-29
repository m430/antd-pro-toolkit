const proxy = require('http-proxy-middleware')

module.exports = function expressMiddleware (router) {
  router.use('/api', proxy({
    target: 'http://oms.magpiee.com.cn:28081',
    changeOrigin: true
  }))
}