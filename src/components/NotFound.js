import React from 'react'
import { connect } from 'react-redux'
import logo from './images/404.jpg';

const NotFound = () => (
  <div>
    <img src={logo} alt="not found" style={{display: 'block', margin: 'auto', }} />
  </div>
);
function mapStateToProps ({authedUser}) {
  return {
   authedUser,
 }
}
export default connect(mapStateToProps)(NotFound)
