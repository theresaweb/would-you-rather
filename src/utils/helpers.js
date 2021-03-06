export function formatDate (timestamp) {
  const d = new Date(timestamp)
  const time = d.toLocaleTimeString('en-US')
  return d.toLocaleDateString() + ' at ' + time.substr(0, 5) + time.slice(-2)
}

export function formatPoll (poll) {
  const { id, author, timestamp, choicesTxt, choice1, choice2 } = poll
  return {
    id,
    timestamp,
    author,
    choicesTxt,
    choice1,
    choice2,
  }
}

export function formatUser (user) {
  const { id, name, avatarURL, polls } = user
  return {
    id,
    name,
    avatarURL,
    polls,
  }
}
