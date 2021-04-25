const animateMatchedPair = (firstSelectedCard, secondSelectedCard) => {
  const matchedAnimation =
    "animation-duration: 0.5s; animation-name: cards-matched;"
  firstSelectedCard.setAttribute("style", matchedAnimation)
  secondSelectedCard.setAttribute("style", matchedAnimation)
}

// Only private functions above

const areCardsMatched = (cardDeck, firstCard, secondCard) => {
  return cardDeck[firstCard].icon === cardDeck[secondCard].icon
}

const markPairAsMatched = (firstCardIndex, secondCardIndex) => {
  const firstSelectedCard = document.getElementById(`${firstCardIndex}`)
  firstSelectedCard.setAttribute("class", "card match")

  const secondSelectedCard = document.getElementById(`${secondCardIndex}`)
  secondSelectedCard.setAttribute("class", "card match")

  animateMatchedPair(firstSelectedCard, secondSelectedCard)
}

const isCardAlreadyMatched = (cardIndex) => {
  return document
    .getElementById(`${cardIndex}`)
    .getAttribute("class")
    .includes("match")
}

export { areCardsMatched, markPairAsMatched, isCardAlreadyMatched }
