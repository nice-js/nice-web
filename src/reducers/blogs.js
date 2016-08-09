import * as types from '../constants/ActionTypes'

const initialState = {
  dataSource: {
    items: []
  },
  loading: true
}

export default function (state = initialState, action) {
  switch (action.type) {
  case types.RECEIVE_BLOGS:
    return {
      ...state,
      loading: false,
      dataSource: {
        items: action.blogs || []
      }
    }
  case types.REQUEST_BLOGS:
    return {
      ...state,
      loading: true
    }
  default:
    return state
  }
}
