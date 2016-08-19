import React from 'react'
import {Route, Router, IndexRoute} from 'react-router'

// react components
import Home from './containers/Home'
import About from './components/About'

export const renderRoutes = (history) => (
  <Router history={history}>
    <Route path='/'>
      <Route path='home' component={Home}/>
      <Route path='about' component={About}/>
      <IndexRoute component={Home}/>
    </Route>
  </Router>
)
