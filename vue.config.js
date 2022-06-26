const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // port: 3000,
  // devServer: {
  //   proxy: {
  //     '/api': {
  //        target: 'http://127.0.0.1:8080',
  //        ws: false,
  //        changeOrigin: true
  //    }
  //   }
  // }
})
