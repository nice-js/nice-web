import Koa from 'koa'
import render from 'koa-swig'
import path from 'path'
import logger from 'koa-logger'
import Debug from 'debug'
import serve from 'koa-static'
import reactServerRender from './middlewares/reactServerRender'
import createMemoryHistory from 'history/lib/createMemoryHistory'
import configureStore from '../src/store/configureStore'
import routes from './routes'
import webpack from '../webpack'
import createRoutes from '../src/routes'

const debug = Debug('app:server:main')
const app = new Koa()

// apply webpack middleare
if (app.env === 'development') {
  webpack(app)

  // apply static server
  app.use(serve(path.join(__dirname, '../public')))
} else {
  app.use(serve(path.join(__dirname, '../build')))
}

// apply koa logger
app.use(logger())

// apply swig view engine
app.context.render = render({
  root: path.join(__dirname, 'views'),
  autoescape: true,
  cache: app.env === 'development' ? false : 'memory', // disable, set to false
  ext: 'html'
})

// apply react server render
const history = createMemoryHistory()
const store = configureStore({}, history)
app.use(reactServerRender(createRoutes(history), store))

// apply routes
app.use(routes())

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  debug(`listen on PORT:${PORT}`)
})
