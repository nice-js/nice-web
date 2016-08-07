import {RouterContext, match} from 'react-router'
import createMemoryHistory from 'history/lib/createMemoryHistory'
import createLocation from 'history/lib/createLocation'
import ReactDOMServer from 'react-dom/server'
import React from 'react'
import {Provider} from 'react-redux'

// get component fetchData promise
const getFetchDataPromise = (renderProps, store, history) => {
  const {query, params} = renderProps
  const component = renderProps.components[renderProps.components.length - 1]
  return component.fetchData
    ? component.fetchData({query, params, store, history})
    : Promise.resolve()
}

// match react routes
const matchRoutes = ({routes, location}) => new Promise((resolve, reject) => {
  match({
    routes,
    location
  }, (error, redirectLocation, renderProps) => {
    if (error) {
      reject(error)
      return
    }

    resolve({redirectLocation, renderProps})
  })
})

// render components
const _renderComponents = (props, store) => {
  return ReactDOMServer.renderToStaticMarkup(
    <Provider store={store}><RouterContext {...props}/></Provider>
  )
}

// middleware
export default(routes, store, options = {}) => {
  return function * (next) {
    const history = createMemoryHistory()

    try {
      const route = yield matchRoutes({routes, location: this.url})
      const {redirectLocation, renderProps} = route

      // redirect
      if (redirectLocation) {
        this.redirect(302, redirectLocation.pathname + redirectLocation.search)
        return
      }

      // render props
      if (renderProps) {
        yield getFetchDataPromise(renderProps, store, history)
        const reduxState = JSON.stringify(store.getState())
        const html = _renderComponents(renderProps, store)
        yield this.render(options.view || 'index', {html, reduxState})
        return
      }
    } catch (error) {
      this.throw(500, error)
    }

    yield * next
  }
}
