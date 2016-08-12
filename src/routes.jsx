import React from 'react'
import {Route, Router, IndexRoute} from 'react-router'

import Home from './containers/Home'
import About from './components/About'

export default(history) => (
  <Router history={history}>
    <Route path='/'>
      <Route path='home' component={Home}/>
      <Route path='about' component={About}/>
      <IndexRoute component={Home}/>
    </Route>
  </Router>
)
