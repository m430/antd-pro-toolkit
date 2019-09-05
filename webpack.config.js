/* eslint no-param-reassign: 0 */
// This config is for building dist files
const getWebpackConfig = require('antd-tools/lib/getWebpackConfig');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const { webpack } = getWebpackConfig;

// noParse still leave `require('./locale' + name)` in dist files
// ignore is better: http://stackoverflow.com/q/25384360
function ignoreMomentLocale(webpackConfig) {
  delete webpackConfig.module.noParse;
  webpackConfig.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));
}

function addLocales(webpackConfig) {
  let packageName = 'antd-with-locales';
  if (webpackConfig.entry['antd-pro-toolkit-min']) {
    packageName += '-min';
  }
  webpackConfig.entry[packageName] = './index-with-locales.js';
  webpackConfig.output.filename = '[name].js';
}

function externalMoment(config) {
  config.externals.moment = {
    root: 'moment',
    commonjs2: 'moment',
    commonjs: 'moment',
    amd: 'moment',
  };
  config.externals.antd = {
    root: 'antd',
    commonjs2: 'antd',
    commonjs: 'antd',
    amd: 'antd',
  };
  config.externals.lodash = {
    root: '_',
    commonjs2: 'lodash',
    commonjs: 'lodash',
    amd: 'lodash',
  };
  config.externals['lodash-decorators'] = {
    root: 'lodash-decorators',
    commonjs2: 'lodash-decorators',
    commonjs: 'lodash-decorators',
    amd: 'lodash-decorators',
  };
  config.externals.bizcharts = {
    root: 'bizcharts',
    commonjs2: 'bizcharts',
    commonjs: 'bizcharts',
    amd: 'bizcharts',
  };
  config.externals['@antv/data-set'] = {
    root: 'DataSet',
    commonjs2: 'DataSet',
    commonjs: 'DataSet',
    amd: 'DataSet',
  };
}

function addBundleAnalyzer(webpackConfig) {
  webpackConfig.plugins.push(new BundleAnalyzerPlugin({
    analyzerMode: 'static'
  }));
}

const webpackConfig = getWebpackConfig(false);
if (process.env.RUN_ENV === 'PRODUCTION') {
  webpackConfig.forEach(config => {
    ignoreMomentLocale(config);
    externalMoment(config);
    addLocales(config);
    if (process.env.ANALYZE = 'TRUE') {
      addBundleAnalyzer(config);
    }
  });
}

module.exports = webpackConfig;
