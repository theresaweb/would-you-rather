import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatPoll, formatDate } from '../utils/helpers'

 class Poll extends Component {
  handleLike = (e) => {
    e.preventDefault()
     // todo: Handle Like Tweet
  }
  toParent = (e, id) => {
    e.preventDefault()
    // todo: Redirect to parent Tweet.
  }
  render() {
    const { poll } = this.props
     if (poll === null) {
      return <p>This Poll doesn't existd</p>
    }
     const {
      id, timestamp, choicesTxt, choice1, choice2
    } = poll
     return (
      <div className='poll'>
        <div className='poll-info'>
          <div>
            <span>{id}</span>
            <div>{formatDate(timestamp)}</div>
            {choicesTxt.map((choice, index) => {
              return (
                <div key={index}>{choice}</div>
            )
            })}
            <p>Answered a: {choice1.length}</p>
            <p>Answered b: {choice2.length}</p>
          </div>
        </div>
      </div>
    )
  }
}
 function mapStateToProps ({authedUser, users, polls}, { id }) {
  const poll = polls[id]
   return {
    authedUser,
    poll: poll
      ? formatPoll(poll, users[poll.author], authedUser)
      : null
  }
}
 export default connect(mapStateToProps)(Poll)
