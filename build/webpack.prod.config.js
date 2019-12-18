const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin')
const webpackBaseConfig = require('./webpack.base.config')
const config = require('./config')

module.exports = merge.smart(webpackBaseConfig, {
  mode: 'production',
  module: {
    rules: [{
      test: /\.less$/,
      use: ExtractTextPlugin.extract(['css?minimize', 'less'])
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        API_HOST: JSON.stringify(config.prod.apiHostName)
      }
    }),
    new CleanWebpackPlugin([ path.join(__dirname, '../dist/*') ], {
      root: process.cwd()
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].[hash:8].css',
      disable: false,
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      title: config.prod.title,
      filename: 'index.html',
      favicon: path.join(__dirname, '../src/assets/favicon.ico'),
      template: path.join(__dirname, '../src/assets/templates/index.hbs'),
      inject: true,
      hash: true,
      showErrors: true,
      chunks: ['libs', 'vendor', 'index']
    }),
    new ModuleConcatenationPlugin()
  ]
})