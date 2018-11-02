import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Login from './Login'
import Logout from './Logout'
import Homepage from './Homepage'
import LoadingBar from 'react-redux-loading'
import NewPoll from './NewPoll'
import PollPage from './PollPage'
import Leaderboard from './Leaderboard'
import NotFound from './NotFound'
import Nav from './Nav'
import './css/App.css'

class App extends Component {
  componentDidMount() {
    this.props.getData()
  }
  render() {
    const { loading } = this.props
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <Nav />
            {loading ? null :
              <div>
                  <Switch>
                    <Route path='/' exact component={Homepage} />
                    <Route path='/login' component={Login} />
                    <Route path='/logout' component={Logout} />
                    <Route path='/questions/:id' component={PollPage} />
                    <Route path='/add' component={NewPoll} />
                    <Route path='/leaderboard' component={Leaderboard} />
                    <Route path='/notfound' component={NotFound} />
                  </Switch>
                </div>}
          </div>
        </Fragment>
      </Router>
    )
  }
}
function mapDispatchToProps(dispatch) {
  return {
    getData: () => dispatch(handleInitialData())
  }
}
function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
