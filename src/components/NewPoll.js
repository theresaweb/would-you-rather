import React, { Component } from 'react'

class NewPoll extends Component {
  state = {
    choicesTxt: [],
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
     // todo: Add Tweet to Store
     console.log('New Poll: ', choicesTxt)
     this.setState(() => ({
      choicesTxt: []
    }))
  }
  render() {
    const { choicesTxt } = this.state
     {/* todo: Redirect to / if submitted */}
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
            disabled={choicesTxt[0] === '' || choicesTxt[1] === ''}>
              Submit
          </button>
        </form>
      </div>
    )
  }
}
 export default NewPoll
