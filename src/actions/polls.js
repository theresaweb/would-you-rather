import {  savePoll, saveChoice } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const ADD_POLL = 'ADD_POLL'
function addPoll (poll) {
  return {
    type: ADD_POLL,
    poll,
  }
}
 export function handleAddPoll (choicesTxt) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
     dispatch(showLoading())
     return savePoll({
      choicesTxt,
      author: authedUser
    })
      .then((poll) => dispatch(addPoll(poll)))
      .then(() => dispatch(hideLoading()))
  }
}
export function takePoll (id, choice, authedUser) {
 return (dispatch, getState) => {
   const { authedUser } = getState()
    dispatch(showLoading())
    return saveChoice({
     id,
     choice,
     authedUser
   })
   .then(() => dispatch(hideLoading()))
 }
}
export const RECEIVE_POLLS = 'RECEIVE_POLLS'
 export function receivePolls (polls) {
  return {
    type: RECEIVE_POLLS,
    polls,
  }
}
