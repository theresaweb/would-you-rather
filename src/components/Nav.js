import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import './css/Nav.css'

function navLinks() {
  const links = [
    ['/','Home'],
    ['/add','New Poll'],
    ['/leaderboard','Leaderboard']
  ]
  return (
    links.map(link => (
      <li key={link[1]}>
        <NavLink to={link[0]} exact activeClassName='active'>
          {link[1]}
        </NavLink>
      </li>
    ))
  )
}
const Nav = ({ authedUser, usersName }) => {
    return (
      <nav className='nav'>
        <ul>
          {navLinks()}
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
              <Fragment>
                <li className="divider"></li>
                <li>
                  <NavLink to='/logout'>Logout</NavLink>
                </li>
              </Fragment>
            }
        </ul>

      </nav>
    )
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
