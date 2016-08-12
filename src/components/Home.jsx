import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import styles from './style.less'
import Helmet from 'react-helmet'

class Home extends Component {

  componentDidMount() {
    this.props.fetchBlogs()
  }

  renderItems(items) {
    return items.map((item) => {
      return (
        <li key={item.name}>{item.name}</li>
      )
    })
  }

  render() {
    return (
      <div>
        <Helmet title='首页1' meta={[
          {
            'name': 'description',
            'content': 'test application'
          }, {
            'property': 'og:type',
            'content': 'article'
          }
        ]}/>
        <ul className='nav nav-tabs'>
          <li role='presentation'>
            <Link to={'/home'} className='active'>home</Link>
          </li>
          <li >
            <Link to={'/about'}>about</Link>
          </li>
        </ul>
        <div className={styles.body}>
          Home
        </div>
        <ul>
          {this.renderItems(this.props.blogs.dataSource.items || [])}
        </ul>
      </div>
    )
  }
}

Home.propTypes = {
  blogs: PropTypes.object.isRequired,
  fetchBlogs: PropTypes.func.isRequired
}

export default Home
