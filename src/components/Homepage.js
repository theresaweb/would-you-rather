import React, { Component } from 'react'
import { connect } from 'react-redux'
import Poll from './Poll'
import './Homepage.css'

class Homepage extends Component {
  state = {
    answered: false
  }
  handleChange = (e) => {
    console.log(e.target.checked)
    const answered = e.target.checked
     this.setState(() => ({
      answered
    }))
  }
  render() {
    console.log(this.state.answered)
    function isSameAsAnsweredState(choice1, choice2, answered) {
      return (choice1.length + choice2.length > 0) === answered
    }
    var filteredPolls = this.props.polls.filter(poll => isSameAsAnsweredState(poll.choice1, poll.choice2, this.state.answered))
    console.log("filteredPolls", filteredPolls)
    return (
      <div className="homepage">
        <h1>WOULD YOU RATHER???</h1>
        <div style={{color:'darkcyan'}}>{this.state.answered ? "answered" : "unanswered"}</div>
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
    )
  }
}
 function mapStateToProps ({ polls }) {
   const sorted = Object.keys(polls)
     .sort((a,b) => polls[b].timestamp - polls[a].timestamp)
  const pollsToSend = []
  sorted.map((id) => {
    return pollsToSend.push(polls[id])
  })
  return {
    polls: pollsToSend
  }
}
 export default connect(mapStateToProps)(Homepage)
