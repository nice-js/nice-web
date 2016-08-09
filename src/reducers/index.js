import {
  combineReducers
}
from 'redux'
import {
  routerReducer
}
from 'react-router-redux'
import blogs from './blogs'

const rootReducer = combineReducers({
  blogs,
  routing: routerReducer
})

export default rootReducer
