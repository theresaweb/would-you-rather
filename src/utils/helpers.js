export function formatDate (timestamp) {
  const d = new Date(timestamp)
  const time = d.toLocaleTimeString('en-US')
  return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}

export function formatPoll (poll, author, authedUser) {
  const { id, timestamp, choicesTxt, choice1, choice2 } = poll
  const { name, avatarURL } = author

  return {
    name,
    id,
    timestamp,
    choicesTxt,
    choice1,
    choice2,
    avatar: avatarURL,
  }
}
