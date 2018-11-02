import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import './css/Leaderboard.css'

const filterAuther = (polls, id) => polls.filter((poll) => poll.author === id).length
const filterAnsweredPolls = (polls, id) =>
  polls.filter((poll) => poll.choice1.includes(id) || poll.choice2.includes(id)).length

const Leaderboard = ({ authedUser, users, polls }) => {
    if (authedUser === '') {
      return (
        <Redirect to={{pathname: '/login', state: {redirectUrl: this.props.location.pathname}}} />
    )}
    return (
      <div className="leaderboard">
        <h1>WOULD YOU RATHER???</h1>
        <h2>Leaderboard</h2>
        <ul className="leaderboard-list">
        {users.map(({ id, avatarURL, name }) => {
          return (
            <li key={id}><span className="info">
              <div className="userInfo"><img className="avatar" src={avatarURL} alt={name} /><span className="userName">{name}</span></div>
              <div><strong>Polls created: </strong>{filterAuther(polls, id)}</div>
              <div><strong>Polls answered: </strong>{filterAnsweredPolls(polls, id)}</div>
            </span>
            </li>
          )
        })}
        </ul>
      </div>
    )
}
function mapStateToProps ({ polls, users, authedUser }) {
  const thePolls = []
  Object.entries(polls).forEach(([key, value]) => {
    thePolls.push(value)
  });
  const theUsers = []
  Object.entries(users).forEach(([key, value]) => {
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
