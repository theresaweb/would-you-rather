import React, { Component } from 'react'
import { connect } from 'react-redux'
import Poll from './Poll'


class Homepage extends Component {
  render() {
    return (
      <div>
        <h1 className='center'>WOULD YOU RATHER???</h1>
        <ul className='homepage-list'>
          {this.props.pollIds.map((id) => (
            <li key={id}>
              <Poll id={id} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
 function mapStateToProps ({ polls }) {
  return {
    pollIds: Object.keys(polls)
      .sort((a,b) => polls[b].timestamp - polls[a].timestamp)
  }
}
 export default connect(mapStateToProps)(Homepage)
