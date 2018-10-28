import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Poll from './Poll'
import './PollPage.css'
//import NewPoll from './NewPoll'

class PollPage extends Component {
  render() {
    const { id, poll, authedUser } = this.props
    if(poll === undefined) {
      return <Redirect to='/notfound' />
    }
    const totalAnswers = poll.choice1.length + poll.choice2.length
    const percChoice1 = totalAnswers > 0 ? parseInt((poll.choice1.length / totalAnswers) * 100, 10) : 0
    const userChosen = findAuthedUserChoice(authedUser)
    function findAuthedUserChoice () {
      if(poll.choice1.includes(authedUser)) {
        return poll.choicesTxt[0]
      } else if (poll.choice2.includes(authedUser)) {
        return poll.choicesTxt[1]
      } else {
        return false
      }
    }
    if (authedUser === '') {
     return (
       <h1 className="pleaseLogin">
         Please <a href="/login">login</a>
       </h1>
     )} else {
      return (
        <div className='pollPage'>
          <h1>WOULD YOU RATHER???</h1>
          <Poll id={id} />
            <div className='pollDetails'>
              <h2 className='pollTotals'>Total Votes: {totalAnswers}</h2>
              {userChosen &&
                <h2 className='pollChosen'>You chose {userChosen}</h2>
              }
              <div className="pollResults">
                <h4>{poll.choicesTxt[0]} - {percChoice1}%</h4>
                <h4 className='pollChoice2'>{poll.choicesTxt[1]} - {100 - percChoice1}%</h4>
                <progress className="pollResults-1" max="100" value={percChoice1}>
                </progress>
              </div>
            </div>
        </div>
      )
    }
  }
}
 function mapStateToProps ({ authedUser, polls, users }, props) {
  const { id } = props.match.params
  const thePolls = [];
  Object.entries(polls).forEach(([key, value]) => {
    thePolls.push(value)
  });
  const poll = thePolls.filter((p) => p.id === id)[0]
  console.log("poll is?",poll)
  return {
    authedUser,
    id,
    poll: poll
  }
}
 export default connect(mapStateToProps)(PollPage)
