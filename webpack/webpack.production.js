const path = require('path')
const webpack = require('webpack')
const precss = require('precss')
const autoprefixer = require('autoprefixer')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    bundle: './src/main.jsx',
    vendor: [
      'react',
      'react-dom',
      'history',
      'react-router',
      'redux',
      'react-redux',
      'axios',
      'promise-es6',
      'react-router-redux'
    ]
  },
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'js/[name].[hash:16].js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: '../server/views/index.html',
      minify: {
        collapseWhitespace: true
      }
    }),
    new CopyWebpackPlugin([{
      from: {
        glob: './public/'
      }
    }], {
      copyUnmodified: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.CommonsChunkPlugin(
      /* chunkName= */
      'vendor',
      /* filename= */
      'js/vendor.[hash:16].js'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin('css/bundle.[hash:16].css')
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.js|jsx$/,
      exclude: /(node_modules|bower_components)/,
      loaders: ['babel']
    }, {
      test: /\.css|less$/,
      loader: ExtractTextPlugin.extract(
        'style?sourceMap',
        'css?modules&importLoaders=1&' +
        'localIdentName=[path]_[name]_[local]_[hash:base64:5]' +
        '!postcss-loader!less?sourceMap', {
          publicPath: './build'
        }
      )
    }]
  },
  postcss: function () {
    return [precss, autoprefixer]
  }
}
