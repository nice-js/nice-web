const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

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
    path: 'build/',
    filename: 'js/[name].js'
  },
  plugins: [
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
      'js/vendor.js'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin('css/bundle.css')
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
        'style',
        'css?modules&importLoaders=1&' +
        'localIdentName=[path]_[name]_[local]_[hash:base64:5]!autoprefixer?browsers=last 2 version!less', {
          publicPath: './build'
        }
      )
    }]
  }
}
