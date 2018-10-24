import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import './Nav.css'

class Nav extends Component {
  render() {
    return (
      <nav className='nav'>
        <ul>
          <li>
            <NavLink to='/' exact activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/new' activeClassName='active'>
              New Poll
            </NavLink>
          </li>
        </ul>
        <span className="naveUsername">Hi {this.props.authedUser}</span>
      </nav>
    )
  }
}
function mapStateToProps ({ authedUser }) {
 return {
   authedUser
 }
}
export default connect(mapStateToProps)(Nav)
