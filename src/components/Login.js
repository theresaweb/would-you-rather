import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'
import './css/Login.css'

class Login extends Component {
  state = {
    selectedUser: '',
    toPrev: false,
  }
  handleChange = (event) => {
    this.setState({
      selectedUser: event.target.value
    });
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const { selectedUser } = this.state
    const { dispatch, id } = this.props
    dispatch(setAuthedUser(selectedUser))
    this.setState({
     selectedUser: '',
     toPrev: id ? false : true,
   })
 }
  render() {
    const { selectedUser, toPrev } = this.state
    const { redirectUrl } = this.props.location.state
    if (toPrev === true) {
      return <Redirect to={redirectUrl} />
    }
    return (
      <div className="login">
        <h1>Choose A User</h1>
        <form onSubmit={this.handleSubmit}>
          <select value={selectedUser} onChange={(e) => this.handleChange(e)}>
            <option value="">Select a user</option>
              {this.props.users.map((user) => {
                return (
                  <option key={user.id} value={user.id}>{user.name}</option>
                )
              })}
          </select>
          <button
            className='btn'
            type='submit'
            disabled={selectedUser === ''}>
            Submit
          </button>
        </form>
      </div>
    )
  }
}
function mapStateToProps ({users, authedUser}) {
  const theUsers = []
  Object.entries(users).forEach(([key, value]) => {
    theUsers.push(value)
  });
  return {
   users: theUsers,
   authedUser
 }
}
export default connect(mapStateToProps)(Login)
