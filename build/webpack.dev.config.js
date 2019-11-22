const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackBasicConfig = require('./webpack.base.config')
const config = require('./config')
const includePath = [
  path.join(__dirname, '../src/'),
  path.join(__dirname, '../build/')
]

module.exports = merge.smart(webpackBasicConfig, {
  devServer: {
    host: 'localhost',
    port: 8088,
    compress: true,
    contentBase: path.join(__dirname, '../dist'),
    hot: true,
    inline: true,
    open: true
  },
  devtool: 'cheap-module-eval-source-map',
  mode: 'development',
  module: {
    rules: [{
      test: /\.(js|vue)$/,
      enforce: 'pre',
      use: ['eslint-loader'],
      include: includePath
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        API_HOST: JSON.stringify(config.dev.apiHostName)
      }
    }),
    new HtmlWebpackPlugin({
      title: config.dev.title,
      filename: 'index.html',
      favicon: path.join(__dirname, '../src/assets/favicon.ico'),
      template: path.join(__dirname, '../src/assets/templates/index.hbs'),
      inject: true,
      hash: true,
      showErrors: true,
      chunks: ['libs', 'vendor', 'index']
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.NamedChunksPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  watch: true
})