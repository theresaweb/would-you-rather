import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddPoll } from '../actions/polls'
import { Redirect } from 'react-router-dom'

class NewPoll extends Component {
  state = {
    choicesTxt: [],
    toHome: false,
  }
  handleChange = (e, index) => {
    const choicesTxt = this.state.choicesTxt.slice()
    choicesTxt[index] = e.target.value
     this.setState(() => ({
      choicesTxt
    }))
  }
  handleSubmit = (e) => {
    e.preventDefault()
     const { choicesTxt } = this.state
     const { dispatch, id } = this.props
     dispatch(handleAddPoll(choicesTxt))
     this.setState(() => ({
      choicesTxt: [],
      toHome: id ? false : true,
    }))
  }
  render() {
    const { choicesTxt, toHome } = this.state
    if (toHome === true) {
      return <Redirect to='/' />
    }
     return (
      <div>
        <h3 className='center'>Create a Poll</h3>
        <form className='new-poll' onSubmit={this.handleSubmit}>
          <input
            className="choiceTxt"
            value={choicesTxt[0]}
            onChange={(e) => this.handleChange(e, 0)}
            maxLength={280}
            placeholder="Choice 1"
          />
          <input
            className="choiceTxt"
            value={choicesTxt[1]}
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
    )
  }
}
export default connect()(NewPoll)