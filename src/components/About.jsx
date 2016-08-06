import React, {Component} from 'react'
import {Link} from 'react-router'

class About extends Component {

  render() {
    return <div>

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
