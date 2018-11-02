import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Poll from './Poll'
import './css/Homepage.css'

function isSameAsAnsweredState(choice1, choice2, authedUser, answered) {
  return (choice1.includes(authedUser) || choice2.includes(authedUser)) === answered
}
class Homepage extends Component {
  state = {
    answered: false,
  }
  handleChange = (e) => {
    const { checked } = e.target
    if (this.state.answered !== checked) {
      this.setState((prevState) => ({
        answered: !prevState.answered
      }))
    }
  }
  render() {
    const { authedUser } = this.props
    const { answered } = this.state
    const filteredPolls = this.props.polls.filter(poll => isSameAsAnsweredState(poll.choice1, poll.choice2, authedUser, answered))
    if (authedUser === '') {
    return (
      <Redirect to={{pathname: '/login', state: {redirectUrl: this.props.location.pathname}}} />
    )}
     return (
       <div>
         <div className="homepage">
           <h1>WOULD YOU RATHER???</h1>
           <div className="answeredToggle">{answered ? "answered" : "unanswered"}</div>
           <label className="switch">
             <input type="checkbox" onChange={this.handleChange} />
             <span className="slider round"></span>
           </label>
           <ul className='homepage-list'>
             {filteredPolls.map(({id}) => (
               <li key={id}>
                 <Poll id={id} answered={answered}/>
               </li>
             ))}
           </ul>
         </div>
       </div>
     )
  }
}
 function mapStateToProps ({ polls, users, authedUser }) {
   const sorted = Object.keys(polls)
     .sort((a,b) => polls[b].timestamp - polls[a].timestamp)
  const pollsToSend = []
  sorted.map((id) => {
    return pollsToSend.push(polls[id])
  })
  const theUsers = []
  Object.entries(users).forEach(([key, value]) => {
    theUsers.push(value)
  });
  return {
    polls: pollsToSend,
    users: theUsers,
    authedUser
  }
}
export default connect(mapStateToProps)(Homepage)
