import webpack from 'webpack'
import webpackMiddleware from 'koa-webpack-dev-middleware'
import webpackHotMiddleware from 'koa-webpack-hot-middleware'
import webpackConfig from '../webpack/webpack.development'
import Debug from 'debug'

const debug = Debug('app:server:webpack:index')

export default (app) => {
  if (app.env !== 'development') {
    debug(`env:${app.env} skip webpack dev middleware`)
    return
  }

  debug('enabe webpack dev middleware')

  const compiler = webpack(webpackConfig)

  app.use(webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    noInfo: false,
    lazy: false,
    progress: true,
    hot: true,
    stats: {
      colors: true,
      hash: true,
      cached: true,
      chunkModules: false,
      cachedAssets: true
    }
  }))

  app.use(webpackHotMiddleware(compiler))
}
