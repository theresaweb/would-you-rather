let users = {
  dog_lover: {
    id: "dog_lover",
    name: "Dog Lover",
    avatarURL: "https://loremflickr.com/240/240/dog?lock=40",
  },
  alacazam: {
    id: "alacazam",
    name: "Alexandria Kazam",
    avatarURL: "https://loremflickr.com/240/240/dog?lock=24",
  },
  shoes_hats: {
    id: "shoes_hats",
    name: "Mary Smith",
    avatarURL: "https://loremflickr.com/240/240/dog?lock=39",
  }
}

let polls = {
  "8xf0y6ziyjabvozdd253nd": {
    id: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1518122597860,
    author: "shoes_hats",
    choicesTxt: ['apples','oranges'],
    choice1: ['dog_lover'],
    choice2: ['alacazam','shoes_hats'],
  },
  "5c9qojr2d1738zlx09afby": {
    id: "5c9qojr2d1738zlx09afby",
    timestamp: 1518043995650,
    author: "shoes_hats",
    choicesTxt: ['horse','car'],
    choice1: ['alacazam'],
    choice2: [],
  },
  "f4xzgapq7mu783k9t02ghx": {
    id: "f4xzgapq7mu783k9t02ghx",
    timestamp: 1518043995655,
    author: "shoes_hats",
    choicesTxt: ['train','plane'],
    choice1: ['alacazam'],
    choice2: [],
  },
  "hbsc73kzqi75rg7v1e0i6a": {
    id: "hbsc73kzqi75rg7v1e0i6a",
    timestamp: 1517043995650,
    author: "shoes_hats",
    choicesTxt: ['spaghetti','rigatoni'],
    choice1: [],
    choice2: ['dog_lover']
  },
  "5w6k1n34dkp1x29cuzn2zn": {
    id: "5w6k1n34dkp1x29cuzn2zn",
    timestamp: 1516043995650,
    author: "dog_lover",
    choicesTxt: ['shoes','barefoot'],
    choice1: ['shoes_hats'],
    choice2: [],
  },
  "czpa59mg577x1oo45cup0d": {
    id: "czpa59mg577x1oo45cup0d",
    timestamp: 1515043995650,
    author: "dog_lover",
    choicesTxt: ['dress','jeans'],
    choice1: [],
    choice2: ['shoes_hats'],
  },
  "2mb6re13q842wu8n106bhk": {
    id: "2mb6re13q842wu8n106bhk",
    timestamp: 1515043995650,
    author: "dog_lover",
    choicesTxt: ['forward','backward'],
    choice1: [],
    choice2: ['dog_lover'],
  },
  "nnvkjqoevs8t02lzcc0ky": {
    id: "nnvkjqoevs8t02lzcc0ky",
    timestamp: 1514043995650,
    author: "dog_lover",
    choicesTxt: ['democrat','republican'],
    choice1: ['alacazam'],
    choice2: [],
  },
  "omdbjl68fxact38hk7ypy6": {
    id: "omdbjl68fxact38hk7ypy6",
    timestamp: 1512043995650,
    author: "alacazam",
    choicesTxt: ['democrat','independent'],
    choice1: ['shoes_hats'],
    choice2: [],
  },
  "zmdbjl68fxact38hkgjdkg": {
    id: "zmdbjl68fxact38hkgjdkg",
    timestamp: 1513043995650,
    author: "alacazam",
    choicesTxt: ['mountain climbing','surfing'],
    choice1: [],
    choice2: [],
  },
  "xmdbjl6uroelt38hk7ypy6": {
    id: "xmdbjl6uroelt38hk7ypy6",
    timestamp: 1510043995650,
    author: "alacazam",
    choicesTxt: ['First day of school','Last day of school'],
    choice1: [],
    choice2: [],
  },
}

export function _getUsers () {
  return new Promise((res, rej) => {
    setTimeout(() => res({...users}), 1000)
  })
}

export function _getPolls () {
  return new Promise((res, rej) => {
    setTimeout(() => res({...polls}), 1000)
  })
}

function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

function formatPoll ({ choicesTxt, author }) {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author,
    choicesTxt,
    choice1: [],
    choice2: [],
  }
}

export function _savePoll ({ choicesTxt, author }) {
  return new Promise((res, rej) => {
    const formattedPoll = formatPoll({
      choicesTxt,
      author
    })
    setTimeout(() => {
      polls = {
        ...polls,
        [formattedPoll.id]: formattedPoll,
      }
      users = {
        ...users,
        [author]: {
          ...users[author],
        }
      }
      res(formattedPoll)
    }, 1000)
  })
}

export function _saveChoice ({ id, choice, authedUser }) {
  return new Promise((res, rej) => {
    const pollToUpdate = polls[id]
    if (choice === pollToUpdate.choicesTxt[0]) {
      pollToUpdate.choice1.push(authedUser)
    } else {
      pollToUpdate.choice2.push(authedUser)
    }
    const updatedPolls = polls
    updatedPolls[id] = pollToUpdate
    setTimeout(() => {
      polls = {
        ...updatedPolls,
      }
      users = {
        ...users,
      }
      res(updatedPolls)
    }, 1000)
  })
}
