const proxy = require('http-proxy-middleware')

module.exports = function expressMiddleware (router) {
  router.use('/api', proxy({
    target: 'http://103.192.254.15:28081/',
    changeOrigin: true
  }))
}