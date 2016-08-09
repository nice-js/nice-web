import axios from 'axios'
import {
  REQUEST_BLOGS,
  RECEIVE_BLOGS
}
from '../constants/ActionTypes'

function requestBlogs() {
  return {
    type: REQUEST_BLOGS
  }
}

function receiveBlogs(blogs) {
  return {
    type: RECEIVE_BLOGS,
    blogs
  }
}

export function fetchBlogs() {
  return (dispatch) => {
    dispatch(requestBlogs())
    return axios({
      url: 'http://127.0.0.1:8000/api/blogs',
      method: 'GET'
    }).then(resp => {
      dispatch(receiveBlogs(resp.data))
    })
  }
}
