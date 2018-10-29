import React, { Component } from 'react'
import { connect } from 'react-redux'

class Leaderboard extends Component {
  render() {
    console.log("leaderboard")
    const { authedUser } = this.props
    if (authedUser === '') {
     return (
     <h1 className="pleaseLogin">
       Please <a href="/login">login</a>
     </h1>
    )} else {
      return (
        <div><h1>Leaderboard</h1></div>
      )
    }






  }
}
function mapStateToProps ({ polls, users, authedUser }) {
 return {
   polls,
   users,
   authedUser
 }
}
export default connect(mapStateToProps)(Leaderboard)
