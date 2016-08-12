import Router from 'koa-router'
import requireDir from 'require-dir'

const controllers = requireDir('./controllers')

export default () => {
  const router = new Router({
    prefix: ''
  })

  // 默认进入app

  // index
  router.get('/api/blogs', controllers.blogs.index)

  return router.routes()
}
