const { defineConfig } = require('@vue/cli-service');
const { DefinePlugin } = require('webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
      }),
    ],
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@use "@/assets/colors" as colors;`
      }
    }
  }
});
