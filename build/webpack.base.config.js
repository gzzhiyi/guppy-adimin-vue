const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const includePath = [
  path.join(__dirname, '../src/'),
  path.join(__dirname, '../build/')
]

module.exports = {
  context: path.join(__dirname, '../src'),
  entry: {
    index: path.join(__dirname, '../src/index.js')
  },
  output: {
    publicPath: '/',
    path: path.join(__dirname, '../dist/')
  },
  module: {
    rules: [{
      test: /\.vue$/,
      use: ['vue-loader'],
      include: includePath
    }, {
      test: /\.js$/,
      use: ['babel'],
      include: includePath
    }, {
      test: /\.css$/,
      use: ['style', 'css']
    }, {
      test: /\.less$/,
      use: ['vue-style', 'css', 'less']
    }, {
      test: /\.hbs$/,
      use: ['handlebars-loader'],
      include: includePath
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      use: [{
        loader: 'url',
        options: {
          limit: 8192,
          name: 'images/[name].[ext]'
        }
      }]
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      use: [{
        loader: 'url',
        options: {
          name: 'fonts/[name].[ext]'
        }
      }]
    }]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        libs: {
          name: 'libs',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: 20
        },
        vendor: {
          name: 'vendor',
          chunks: 'async',
          minChunks: 1,
          priority: 10
        }
      }
    }
  },
  output: {
    filename: 'js/[name].[hash:8].js'
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.ProvidePlugin({
      axios: 'axios'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      options: {}
    })
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, '../src'),
      '@components': path.join(__dirname, '../src/components'),
      '@services': '@/services/',
      '@utils': '@/utils/'
    },
    extensions: ['.js', '.vue'],
    modules: [
      'node_modules',
      path.join(__dirname, '../src')
    ]
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
  }
}
