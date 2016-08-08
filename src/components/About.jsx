import React, {Component} from 'react'
import {Link} from 'react-router'
import Helmet from 'react-helmet'

class About extends Component {

  render() {
    return <div>
      <Helmet title='关于我们'/>
      <ul className='nav nav-tabs'>
        <li role='presentation'>
          <Link to={'/home'} className='active'>home</Link>
        </li>
        <li >
          <Link to={'/about'}>about</Link>
        </li>
      </ul>
      <br/>
      <br/>
      About
    </div>
  }
}

export default About
