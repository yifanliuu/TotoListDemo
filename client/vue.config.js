module.exports = {
  devServer: {
    host: 'localhost',
    port: 8000,
    proxy: {
      '/api': {
        // 请求的目标主机
        target: 'http://localhost:3000/',
        changeOrigin: true,
        ws: true,
        pathRewrite:{
          '^/api':''
        }
      }
    }
  }
}