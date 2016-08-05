import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {useRouterHistory} from 'react-router'
import React from 'react'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import {syncHistoryWithStore} from 'react-router-redux'

import promiseES6 from 'promise-es6'
import configureStore from './store/configureStore'
import routes from './routes'

// ========================================================
// promise install
// ========================================================
promiseES6.install()

// ========================================================
// Browser History Setup
// ========================================================
const browserHistory = useRouterHistory(createBrowserHistory)({basename: '/'})

// ========================================================
// Store and History Instantiation
// ========================================================
// Create redux store and sync with react-router-redux. We have installed the
// so we need to provide a custom `selectLocationState` to inform
// react-router-redux of its location.
const initialState = window.___INITIAL_STATE__
const store = configureStore(initialState, browserHistory)
const history = syncHistoryWithStore(browserHistory, store)

// history.listen(location => analyticsService.track(location.pathname));

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')
ReactDOM.render(
  <Provider store={store}>
  {routes(history)}
</Provider>, MOUNT_NODE)
