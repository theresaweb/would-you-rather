import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import './css/Nav.css'

class Nav extends Component {
  render() {
    const { authedUser, usersName } = this.props
    return (
      <nav className='nav'>
        <ul>
          <li>
            <NavLink to='/' exact activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/add' activeClassName='active'>
              New Poll
            </NavLink>
          </li>
          <li>
            <NavLink to='/leaderboard' activeClassName='active'>
              Leaderboard
            </NavLink>
          </li>
        </ul>
        <ul className="loginNav">
            {authedUser ?
              <li>
                <span className="navUsername">Hi {usersName}</span>
              </li>
              :
              <li>
                <NavLink to='/login' activeClassName='active'>
                  Login
                </NavLink>
              </li>
            }
            {authedUser &&
              <li><span>&nbsp;|&nbsp;</span></li>
            }
            {authedUser &&
              <li>
                <NavLink to='/logout'>Logout</NavLink>
              </li>
            }
        </ul>

      </nav>
    )
  }
}
function mapStateToProps ({authedUser, users, polls}) {
  const theUsers = []
  Object.entries(users).forEach(([key, value]) => {
    theUsers.push(value)
  });
  let usersName = ''
  const thisUser = theUsers.filter(user => user.id === authedUser)[0]
  if (thisUser) {
    usersName = thisUser.name
  }
 return {
   authedUser,
   usersName: usersName
 }
}
export default connect(mapStateToProps, null, null, { pure: false })(Nav)
