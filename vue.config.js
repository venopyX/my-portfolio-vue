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
        'process.env': {
          VUE_APP_FIREBASE_API_KEY: JSON.stringify(process.env.VUE_APP_FIREBASE_API_KEY),
          VUE_APP_FIREBASE_AUTH_DOMAIN: JSON.stringify(process.env.VUE_APP_FIREBASE_AUTH_DOMAIN),
          VUE_APP_FIREBASE_PROJECT_ID: JSON.stringify(process.env.VUE_APP_FIREBASE_PROJECT_ID),
          VUE_APP_FIREBASE_STORAGE_BUCKET: JSON.stringify(process.env.VUE_APP_FIREBASE_STORAGE_BUCKET),
          VUE_APP_FIREBASE_MESSAGING_SENDER_ID: JSON.stringify(process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID),
          VUE_APP_FIREBASE_APP_ID: JSON.stringify(process.env.VUE_APP_FIREBASE_APP_ID),
          VUE_APP_FIREBASE_MEASUREMENT_ID: JSON.stringify(process.env.VUE_APP_FIREBASE_MEASUREMENT_ID),
        },
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
