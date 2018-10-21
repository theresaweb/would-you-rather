import React from 'react'
import { NavLink } from 'react-router-dom'
import './Nav.css'

 export default function Nav () {
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
    </nav>
  )
}
