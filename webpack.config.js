const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'antd-pro-toolkit.js',
    library: 'antd-pro-toolkit',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, loader: "awesome-typescript-loader"
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".jsx"]
  },
  externals: {
    'react': 'react',
    'react-dom': 'react-dom',
    'antd': 'antd',
    'calssnames': 'classnames'
  }
}