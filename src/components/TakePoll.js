import React, { Component } from 'react'
import { connect } from 'react-redux'
import { takePoll } from '../actions/polls'
import './css/TakePoll.css'

class TakePoll extends Component {
  state = {
    totalAnswers: 0,
    selected: true
  }
  handleChange = (e) => {
    this.setState({
      selected: false
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const { id, authedUser, dispatch } = this.props
    const radioValue = document.querySelector('input[name="takePoll"]:checked').value
    dispatch(takePoll(id, radioValue, authedUser))
    this.props.onTakenChange(true, radioValue)
  }
  render() {
    const { poll } = this.props
    return (
      <div className='takePoll'>
        <form onSubmit={this.handleSubmit}>
            <h2>Would you rather . . .</h2>
            <div className='pollRadioFields'>
              <div className='pollRadio'>
                  <input type="radio" id={poll.choicesTxt[0]}
                         name="takePoll" value={poll.choicesTxt[0]}
                         onChange={this.handleChange} />
                  <label htmlFor={poll.choicesTxt[0]}>{poll.choicesTxt[0]}</label>
              </div>
              <div className='pollRadio second'>
                  <input type="radio" id={poll.choicesTxt[1]}
                         name="takePoll" value={poll.choicesTxt[1]}
                         onChange={this.handleChange} />
                  <label htmlFor={poll.choicesTxt[1]}>{poll.choicesTxt[1]}</label>
              </div>
              </div>
              <button
                className='btn'
                disabled={this.state.selected}>
                  Submit
              </button>
            
        </form>
      </div>
    )
  }
}
function mapStateToProps ({ polls, authedUser}, {id}) {
 return {
   authedUser,
   poll: polls[id]
 }
}
export default connect(mapStateToProps)(TakePoll)
