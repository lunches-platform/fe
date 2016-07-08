const webpack = require('webpack');
const conf = require('./gulp.conf');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  module: {
    loaders: [
      {
        test: /.json$/,
        loaders: [
          'json'
        ]
      },
      {
        test: /\.(css|scss)$/,
        loaders: [
          'style',
          'css',
          'sass',
          'postcss'
        ]
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loaders: [
          'ng-annotate',
          'ts'
        ]
      },
      {
        test: /\.html$/,
        exclude: /index\.html$/,
        loader: 'ng-cache?prefix=[dir]/[dir]'
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: conf.path.src('index.html'),
      inject: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {unused: true, dead_code: true} // eslint-disable-line camelcase
    })
  ],
  postcss: () => [autoprefixer],
  output: {
    path: path.join(process.cwd(), conf.paths.dist),
    filename: 'index-[hash].js'
  },
  resolve: {
    extensions: [
      '',
      '.webpack.js',
      '.web.js',
      '.js',
      '.ts'
    ]
  },
  entry: [
    `./${conf.path.src('index')}`,
    `./${conf.path.tmp('templateCacheHtml.ts')}`
  ],
  ts: {
    configFileName: 'conf/ts.conf.json'
  },
  tslint: {
    configuration: require('../tslint.json')
  }
};
