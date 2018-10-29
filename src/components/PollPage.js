import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Poll from './Poll'
import TakePoll from './TakePoll'
import './PollPage.css'

class PollPage extends Component {
  state = {
    userTaken: false
  }
componentDidMount() {
  const { poll, authedUser } = this.props
  const userHasTaken = poll.choice1.includes(authedUser) || poll.choice2.includes(authedUser)
  this.setState({
    userTaken: userHasTaken,
    userChosen: ''
  })
}
findAuthedUserChoice (poll, authedUser) {
  if(poll.choice1.includes(authedUser)) {
    return poll.choicesTxt[0]
  } else if (poll.choice2.includes(authedUser)) {
    return poll.choicesTxt[1]
  } else {
    return false
  }
}
render() {
  const { id, poll, authedUser } = this.props
  if(poll === undefined) {
    return <Redirect to='/notfound' />
  }
  const totalAnswers = poll.choice1.length + poll.choice2.length
  const percChoice1 = totalAnswers > 0 ? parseInt((poll.choice1.length / totalAnswers) * 100, 10) : 0
  if (this.state.userTaken) {
    const userAnswer = this.findAuthedUserChoice(poll, authedUser)
    this.setState({
      userChosen: userAnswer
    })
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
            {totalAnswers > 0 &&
              <h2 className='pollTotals'>Total Votes So Far: {totalAnswers}</h2>
            }
            {this.state.userTaken ?
              <h2 className='pollChosen'>You chose {this.state.userChosen}</h2>
            :
              <TakePoll id={id} />
            }
            {totalAnswers > 0 &&
              this.state.userTaken &&
            <div className="pollResults">
              <h4>{poll.choicesTxt[0]} - {percChoice1}%</h4>
              <h4 className='pollChoice2'>{poll.choicesTxt[1]} - {100 - percChoice1}%</h4>
              <progress className="pollResults-1" max="100" value={percChoice1}>
              </progress>
            </div>
            }
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
  return {
    authedUser,
    id,
    poll: poll
  }
}
 export default connect(mapStateToProps)(PollPage)
