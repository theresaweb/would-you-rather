import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddPoll } from '../actions/polls'
import { Redirect } from 'react-router-dom'
import './css/NewPoll.css'

class NewPoll extends Component {
  state = {
    choicesTxt: [],
    toHome: false,
  }
  handleChange = (e, index) => {
    const choicesTxt = this.state.choicesTxt.slice()
    choicesTxt[index] = e.target.value
     this.setState({
      choicesTxt
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
     const { choicesTxt } = this.state
     const { dispatch, id } = this.props
     dispatch(handleAddPoll(choicesTxt))
     this.setState({
      choicesTxt: [],
      toHome: id ? false : true,
    })
  }
  render() {
    const { authedUser } = this.props
    const { choicesTxt, toHome } = this.state
    if (authedUser === '') {
      return (
        <Redirect to={{pathname: '/login', state: {redirectUrl: this.props.location.pathname}}} />
      )
    }
    if (toHome === true) {
      return <Redirect to='/' />
    }
    return (
      <div className="newPoll">
      <h1>WOULD YOU RATHER???</h1>
        <div className="newPoll-content">
          <h3>Create a Poll</h3>
          <form className='new-poll' onSubmit={this.handleSubmit}>
            <input
              className="choiceTxt"
              value={choicesTxt[0] || ''}
              onChange={(e) => this.handleChange(e, 0)}
              maxLength={280}
              placeholder="Choice 1"
            />
            <span>OR</span>
            <input
              className="choiceTxt"
              value={choicesTxt[1] || ''}
              onChange={(e) => this.handleChange(e, 1)}
              maxLength={280}
              placeholder="Choice 2"
            />
            <button
              className='btn'
              type='submit'
              disabled={choicesTxt.length < 2}>
                Submit
            </button>
          </form>
          </div>
      </div>
    )
  }
}
function mapStateToProps ({ polls, users, authedUser }) {
 return {
   polls,
   users,
   authedUser
 }
}
export default connect(mapStateToProps)(NewPoll)
