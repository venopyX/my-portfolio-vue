const { defineConfig } = require('@vue/cli-service');
const { DefinePlugin } = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
              drop_debugger: true,
            },
          },
        }),
      ],
    },
    plugins: [
      new DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
      }),
    ],
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@use "@/assets/colors" as colors;`,
      },
      postcss: {
        postcssOptions: {
          plugins: [
            require('cssnano')({
              preset: 'default',
            }),
          ],
        },
      },
    },
  },
});
