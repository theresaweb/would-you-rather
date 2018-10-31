import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Leaderboard.css'

class Leaderboard extends Component {
  render() {
    const { authedUser, users, polls } = this.props
    if (authedUser === '') {
     return (
     <h1 className="pleaseLogin">
       Please <a href="/login">login</a>
     </h1>
    )} else {
      return (
        <div className="leaderboard">
          <h1>Leaderboard</h1>
          <ul className="leaderboard-list">
          {users.map((user) => {
            const authoredCount = polls.filter((poll) => poll.author === user.id)
            const pollsAnsweredCount = polls.filter((poll) => (poll.choice1.includes(user.id) || poll.choice2.includes(user.id)))
            return (
              <li key={user.id}><span className="info">
                <div className="userInfo"><img className="avatar" src={user.avatarURL} alt={user.name} /><span className="userName">{user.name}</span></div>
                <div><strong>Polls created: </strong>{authoredCount.length}</div>
                <div><strong>Polls answered: </strong>{pollsAnsweredCount.length}</div>
              </span>
              </li>
            )
          })}
          </ul>
        </div>
      )
    }






  }
}
function mapStateToProps ({ polls, users, authedUser }) {
  const thePolls = []
  Object.entries(polls).forEach(([key, value]) => {
    thePolls.push(value)
  });
  const theUsers = []
  Object.entries(users).forEach(([key, value]) => {
    console.log("value",value)
    const authoredCount = thePolls.filter((poll) => poll.author === value.id).length
    const pollsAnsweredCount = thePolls.filter((poll) => (poll.choice1.includes(value.id) || poll.choice2.includes(value.id))).length
    const totalAuthorAnswered = authoredCount + pollsAnsweredCount
    const o1 = value
    const o2 = {'authoredCount':authoredCount}
    const o3 = {'pollsAnsweredCount':pollsAnsweredCount}
    const o4 = {'totalAuthorAnswered':totalAuthorAnswered}
    const obj = Object.assign({}, o1, o2, o3,o4)
    theUsers.push(obj)
  });
  theUsers.sort(function(a, b) {
      return b.totalAuthorAnswered - a.totalAuthorAnswered
  });
 return {
   authedUser,
   polls: thePolls,
   users: theUsers,
 }
}
export default connect(mapStateToProps)(Leaderboard)
