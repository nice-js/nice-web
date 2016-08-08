import React, {Component} from 'react'
import {Link} from 'react-router'
import styles from './style.less'

class Home extends Component {
  static fetchData() {
    return Promise.resolve(10)
  }

  render() {
    return (
      <div>
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
      </div>
    )
  }
}

export default Home
