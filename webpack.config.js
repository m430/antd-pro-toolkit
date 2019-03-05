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
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer')({
                  'browsers': ['> 1%', 'last 2 versions']
                })
              ]
            }
          },
        ]
      },
      {
        test: /.less$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer')({
                  'browsers': ['> 1%', 'last 2 versions']
                })
              ]
            }
          },
          {
            loader: 'less-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".jsx"]
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'antd': 'antd',
    'calssnames': 'classnames'
  }
}