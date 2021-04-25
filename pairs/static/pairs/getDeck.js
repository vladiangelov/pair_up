import { DECKS } from "./const.js"

const getIcons = () => {
  const localStorage = window.localStorage
  const chosenSetting = localStorage.getItem(`settings`) || `it`

  // Fallback with IT icons is in case localStorage gets messed up by the user
  return DECKS[chosenSetting] || DECKS.it
}

const shuffleDeck = (cardDeck) => {
  const shuffledDeck = [...cardDeck]
  let currentIndex = shuffledDeck.length
  let tempValue
  let newIndex

  while (currentIndex !== 0) {
    newIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    tempValue = shuffledDeck[currentIndex]
    shuffledDeck[currentIndex] = shuffledDeck[newIndex]
    shuffledDeck[newIndex] = tempValue
  }

  return shuffledDeck
}

// Only private functions above

const getShuffledDeckFromIconArray = (difficulty) => {
  const iconArray = getIcons()
  let slicedIconArray

  switch (difficulty) {
    case `Easy`:
      slicedIconArray = iconArray.slice(0, 4)
      break
    case `Normal`:
      slicedIconArray = iconArray.slice(0, 6)
      break
    case `Difficult`:
      slicedIconArray = iconArray
      break
  }

  const newDeckArray = slicedIconArray.reduce(
    (res, current) => res.concat([current, current]),
    []
  )

  const mappedNewDeckArray = newDeckArray.map((item) => {
    return { icon: item }
  })

  const shuffledDeck = shuffleDeck(mappedNewDeckArray)

  return shuffledDeck
}

export { getShuffledDeckFromIconArray }
