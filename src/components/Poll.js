import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatPoll, formatDate } from '../utils/helpers'
import { Link, withRouter } from 'react-router-dom'
import './Poll.css'

class Poll extends Component {

  handleLike = (e) => {
    e.preventDefault()
     // todo: Handle Like Tweet
  }
  toParent = (e, id) => {
    e.preventDefault()
    this.props.history.push(`/poll/${id}`)
  }

  render() {
    const { poll, authedUser } = this.props
    if (authedUser === '') {
     return (
       <h1 className="pleaseLogin">
         Please <a href="/login">login</a>
       </h1>
     )} else {
        if (poll === null) {
          return <p>This Poll doesn't exist</p>
        }
         const {
          id, author, timestamp, choicesTxt, choice1, choice2
        } = poll
         return (
          <Link to={`/poll/${id}`} className='poll'>
            <div className='poll-info'>
                <span style={{display:'none'}}>{id}</span>
                <h4 className="pollTitle">Poll created by <span>{author}</span> on <span>{formatDate(timestamp)}</span></h4>
                <div className="pollChoices"><div>{choicesTxt[0]}</div><div style={{color:'black'}}>OR</div><div>{choicesTxt[1]}</div></div>
                {this.props.answered && (
                <div className="pollAnswers">
                  <table>
                    <tbody>
                      <tr>
                        <th>Answered {choicesTxt[0]}</th>
                        <th>Answered {choicesTxt[1]}</th>
                      </tr>
                      <tr>
                        <td>{choice1.length}</td>
                        <td>{choice2.length}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </Link>
        )
      }
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
export default withRouter(connect(mapStateToProps)(Poll))
