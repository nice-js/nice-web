import {
  applyMiddleware,
  compose,
  createStore
}
from 'redux'
import {
  routerMiddleware
}
from 'react-router-redux'
import thunk from 'redux-thunk'
import reducers from '../reducers'

const w = global.window || {}

export default (initialState = {}, history) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middlewares = [thunk, routerMiddleware(history)]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []
  const devToolsExtension = w.devToolsExtension
  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(reducers, initialState, compose(
    applyMiddleware(...middlewares),
    ...enhancers
  ))

  store.asyncReducers = {}

  return store
}
