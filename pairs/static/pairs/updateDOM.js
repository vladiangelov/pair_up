// Hide and show different screens

const hideOptionsAndShowGameBoard = () => {
  document.querySelector(".choose-level").setAttribute("style", "display: none")
  document.querySelector(".game-screen").setAttribute("style", "display: block")
}

const hideGameBoardAndShowResult = (moveCount, time, score) => {
  document.querySelector(".game-screen").setAttribute("style", "display: none")
  document.querySelector(".result-seconds").innerText = time
  document.querySelector(".result-moves").innerText = moveCount
  document.querySelector(".result-score").innerText = score
  document
    .querySelector(".result-screen")
    .setAttribute("style", "display: flex")
}

// Build the inital game deck of cards

const buildCardsDeck = (gameDeck) => {
  const deckElement = document.querySelector(".deck")

  gameDeck.forEach((card, index) => {
    deckElement.innerHTML += `
      <li id="${index}" class="card">
        <i class="${card.icon}"></i>
      </li>
    `
  })
}

// Update elements during gameplay

const hideCard = (selectedCardIndex) => {
  const selectedCard = document.getElementById(`${selectedCardIndex}`)
  selectedCard.setAttribute("class", "card")
}

const showCard = (selectedCardIndex) => {
  const selectedCard = document.getElementById(`${selectedCardIndex}`)
  selectedCard.setAttribute("class", "card shown")
}

const updateMoveCountDisplay = (moveCount) => {
  const countElement = document.querySelector(".moves")
  countElement.innerText = moveCount
}

export {
  hideGameBoardAndShowResult,
  hideOptionsAndShowGameBoard,
  hideCard,
  showCard,
  buildCardsDeck,
  updateMoveCountDisplay,
}
