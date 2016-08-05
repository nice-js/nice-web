import React from 'react'
import {Route, Router} from 'react-router'

import Home from './components/Home'
import About from './components/About'

export default(history) => (
  <Router history={history}>
    <Route path='/home' component={Home}/>
    <Route path='/about' component={About}/>
  </Router>
)
