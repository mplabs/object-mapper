const webpack = require('webpack')

module.exports = {
  entry: [
    'babel-polyfill',
    `${__dirname}/node_modules/normalize.css`,
    './src/theme/main.scss',
    './src/main',
    'webpack-dev-server/client?http://localhost:1337'
  ],
  output: {
    publicPath: '/',
    filename: 'main.js'
  },
  resolve: {
    alias: {
      react: 'preact-compat',
      'react-dom': 'preact-compat',
      'create-react-class': 'preact-compat/lib/create-react-class'
    }
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,

        loader: 'babel-loader',

        include: [`${__dirname}/src`],

        exclude: [`${__dirname}/node_modules`],

        query: {
          presets: ['env', 'stage-0'],
          plugins: [
            'transform-runtime',
            'transform-decorators-legacy',
            'transform-react-jsx'
          ]
        }
      },
      {
        test: /\.html$/,
        loader: 'file-loader?name=[name].[ext]'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!postcss-loader!sass-loader'
      }
    ]
  },
  devServer: {
    contentBase: './src',
    port: 1337
  }
}
