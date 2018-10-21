import React, { Component } from 'react'
import { connect } from 'react-redux'
import Poll from './Poll'
import NewPoll from './NewPoll'

class PollPage extends Component {
  render() {
    const { id, choice1, choice2 } = this.props
    return (
      <div>
        {/*On this page I want to check if the polls been taken and give the option
          also want to show the resutls so far??
          */}
        <Poll id={id} />
        <hr />
        {choice1.length !== 0 && <h3 className='center'>Replied choice1</h3>}
        <ul>
          {choice1.map((chooser) => (
            <li key={chooser}>
              show user who has taken poll here?
              {/*<User id={chooser}/>*/}
            </li>
          ))}
        </ul>
        {choice2.length !== 0 && <h3 className='center'>Replied choice2</h3>}
        <ul>
          {choice2.map((chooser) => (
            <li key={chooser}>
              show user who has taken poll here?
              {/*<User id={chooser}/>*/}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
 function mapStateToProps ({ authedUser, polls, users }, props) {
  const { id } = props.match.params
   return {
    id,
    choice1: !polls[id]
      ? []
      : polls[id].choice1,
    choice2: !polls[id]
      ? []
      : polls[id].choice2
  }
}
 export default connect(mapStateToProps)(PollPage)
