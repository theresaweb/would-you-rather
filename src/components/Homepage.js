import React, { Component } from 'react'
import { connect } from 'react-redux'
import Poll from './Poll'
import './css/Homepage.css'

class Homepage extends Component {
  state = {
    answered: false,
  }
  handleChange = (e) => {
    const answered = e.target.checked
     this.setState(() => ({
      answered
    }))
  }
  render() {
    function isSameAsAnsweredState(choice1, choice2, authedUser, answered) {
      return (choice1.includes(authedUser) || choice2.includes(authedUser)) === answered
    }
    const { authedUser } = this.props
    const filteredPolls = this.props.polls.filter(poll => isSameAsAnsweredState(poll.choice1, poll.choice2, authedUser, this.state.answered))
    if (authedUser === '') {
     return (
       <div className="homepage">
         <h1>WOULD YOU RATHER???</h1>
         <h2 className="pleaseLogin">
           Please <a href="/login">login</a>
         </h2>
       </div>
   )} else {
     return (
         <div>
           <div className="homepage">
             <h1>WOULD YOU RATHER???</h1>
             <div className="answeredToggle">{this.state.answered ? "answered" : "unanswered"}</div>
             <label className="switch">
               <input type="checkbox" onChange={this.handleChange} />
               <span className="slider round"></span>
             </label>
             <ul className='homepage-list'>
               {filteredPolls.map((poll) => (
                 <li key={poll.id}>
                   <Poll id={poll.id} answered={this.state.answered}/>
                 </li>
               ))}
             </ul>
           </div>
         </div>
     )
   }
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
