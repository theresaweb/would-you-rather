import {
  _getUsers,
  _getPolls,
  _savePoll,
  _saveChoice,
} from './_DATA.js'

export function getInitialData () {
  return Promise.all([
    _getUsers(),
    _getPolls(),
  ]).then(([users, polls]) => ({
    users,
    polls,
  }))
}

export function savePoll (info) {
  return _savePoll(info)
}
export function saveChoice (info) {
  console.log("info",info)
  return _saveChoice(info)
}
