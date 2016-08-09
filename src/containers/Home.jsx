import {connect} from 'react-redux'
import React, {Component, PropTypes} from 'react'
import Home from '../components/Home'
import {bindActionCreators} from 'redux'
import * as blogsActions from '../actions/blogs'

class HomeConatiner extends Component {

  static fetchData({store, params, location}) {
    console.log(location.query)
    return store.dispatch(blogsActions.fetchBlogs())
  }

  render() {
    return (
      <div>
        <Home blogs={this.props.blogs} fetchBlogs={this.props.fetchBlogs}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {blogs: state.blogs}
}

function mapDispatchToProps(dispatch, ownProps) {
  return bindActionCreators(blogsActions, dispatch)
}

HomeConatiner.propTypes = {
  blogs: PropTypes.object.isRequired,
  fetchBlogs: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeConatiner)
