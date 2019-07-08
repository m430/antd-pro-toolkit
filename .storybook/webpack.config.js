// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.
const path = require('path');
const { resolve } = require('../config/utils/helper');

module.exports = ({ config }) => {
  config.module.rules.push(
    {
      test: /\.tsx?$/,
      use: [
        {
          loader: resolve('babel-loader'),
        },
        {
          loader: resolve('awesome-typescript-loader'),
        },
      ],
      exclude: /node_modules/
    },
    {
      test: /\.less$/,
      use: [
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: { importLoaders: 1}
        },
        {
          loader: 'less-loader', options: {
            javascriptEnabled: true
          }
        }
      ]
    },
    {
      test: /\.stories\.js?$/,
      loaders: [require.resolve('@storybook/addon-storysource/loader')],
      enforce: 'pre',
    }
  )
  config.resolve.extensions.push('.ts', '.tsx', '.js');

  return config;
}