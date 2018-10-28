import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import logo from './images/404.jpg';

const NotFound = () => (
  <div>
    <img src={logo} style={{display: 'block', margin: 'auto', }} />
  </div>
);
function mapStateToProps ({authedUser}) {
  return {
   authedUser,
 }
}
export default connect(mapStateToProps)(NotFound)
