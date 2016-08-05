import React, {Component} from 'react'
import {Link} from 'react-router'

class Home extends Component {
  static fetchData() {
    console.log('Hello')
    return Promise.resolve(10)
  }

  render() {
    return (
      <div>
        <div>
          <Link to={'/home'}>home</Link>
          <Link to={'/about'}>home</Link>
        </div>
        Hello
      </div>
    )
  }
}

export default Home
