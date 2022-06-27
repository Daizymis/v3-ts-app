const { defineConfig } = require('@vue/cli-service')
const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');

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
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
    ],
  }
})
