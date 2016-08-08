const path = require('path')
const webpack = require('webpack')
const precss = require('precss')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')

const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr'

module.exports = {
  entry: {
    bundle: [path.join(__dirname, '../src/main.jsx'), hotMiddlewareScript],
    vendor: ['react', 'react-dom', 'classnames', 'redux', 'axios']
  },
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'js/[name].[hash:16].js',
    publicPath: '/'
  },
  watch: true,
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      template: 'src/index.html',
      filename: '../server/views/index.html',
      minify: {
        collapseWhitespace: false
      }
    }),
    new HtmlWebpackHarddiskPlugin(),
    new webpack.optimize.CommonsChunkPlugin(
      /* chunkName= */
      'vendor',
      /* filename= */
      'js/vendor.[hash:16].js'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.js|jsx$/,
      exclude: /(node_modules)/,
      loaders: ['react-hot', 'babel']
    }, {
      test: /\.css|less$/,
      loaders: [
        'style?sourceMap',
        'css?sourceMap&modules&importLoaders=1&' +
        'localIdentName=[path]_[name]_[local]_[hash:base64:5]!postcss-loader!less?sourceMap'
      ]
    }]
  },
  postcss: function () {
    return [precss, autoprefixer]
  }
}
