import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'
import './Login.css'

class Logout extends Component {
  state = {
    selectedUser: '',
    toHome: false,
  }
logout = () => {
    const { dispatch, id } = this.props
    dispatch(setAuthedUser(''))
    this.setState(() => ({
     selectedUser: '',
     toHome: id ? false : true,
   }))
 }
 componentDidMount () {
   this.logout()
 }
  render() {
    const { toHome } = this.state
    if (toHome === true) {
      return <Redirect to='/' />
    }
    return (
      <div>logging out</div>
    )
  }
}
function mapStateToProps ({authedUser}) {
  return {
   authedUser
 }
}
export default connect(mapStateToProps)(Logout)
