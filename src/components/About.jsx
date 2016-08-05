import React, {Component} from 'react'
import {Link} from 'react-router'

class About extends Component {
  render() {
    return <div>

      <Link to={'/home'}>home</Link>
      <Link to={'/about'}>home</Link>
      About
    </div>
  }
}

export default About
