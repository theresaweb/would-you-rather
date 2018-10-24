import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Login.css'

class Login extends Component {
  render() {
    return (
      <div>
        <select>
          <option value="">Select a user</option>
            {this.props.users.map((user) => {
              return (
                <option key={user.id} value={user.id}>{user.name}</option>
              )
            })}
        </select>
      </div>
    )
  }
}
function mapStateToProps ({users}) {
  const theUsers = []
  Object.entries(users).forEach(([key, value]) => {
    theUsers.push(value)
  });
  return {
   users: theUsers
 }
}
export default connect(mapStateToProps)(Login)
