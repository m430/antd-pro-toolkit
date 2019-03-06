// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.
const path = require('path');
const { resolve } = require('../config/utils/helper'); 
const babelConfig = require('../getBabelCommonConfig')();

module.exports = (baseConfig, env, config) => {
  config.module.rules.push({
    test: /\.tsx?$/,
    use: [
      {
        loader: resolve('babel-loader'),
        options: babelConfig,
      },
      {
        loader: resolve('ts-loader'),
        options: {
          transpileOnly: true,
        },
      },
    ],
  }, {
      test: /\.less$/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader', options: { importLoaders: 1 } },
        { loader: 'less-loader' }
      ]
    })
  config.resolve.extensions.push('.ts', '.tsx');

  return config;
}