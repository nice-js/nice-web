import Koa from 'koa'
import render from 'koa-swig'
import path from 'path'
import logger from 'koa-logger'
import routes from './routes'
import webpack from '../webpack'
import Debug from 'debug'

const debug = Debug('app:server:main')
const app = new Koa()

// ========================================================
//  测试环境webpack的集成
// ========================================================
if (app.env === 'development') {
  webpack(app)
}

// ========================================================
//  Koa日志的中间件集成
// ========================================================
app.use(logger())

// ========================================================
//  Koa日志中间件集成
//  模板缓存说明: 模板不适用缓存，修改模板不用重新启动，其他环节进行缓存如果修改需要重启服务
// ========================================================
app.context.render = render({
  root: path.join(__dirname, 'views'),
  autoescape: true,
  cache: app.env === 'development' ? false : 'memory', // disable, set to false
  ext: 'html'
})

// ========================================================
//  Koa静态资源中间件集成
// ========================================================
app.use(require('koa-static')(path.join(__dirname, '../build')))
app.use(require('koa-static')(path.join(__dirname, '../public')))

// ========================================================
//  Koa路由中间件集成
// ========================================================
app.use(routes())

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  debug(`listen on PORT:${PORT}`)
})
