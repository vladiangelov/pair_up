import { MATCHED_PAIRS_TO_WIN } from "./const.js"
import { getShuffledDeckFromIconArray } from "./getDeck.js"
import {
  areCardsMatched,
  isCardAlreadyMatched,
  markPairAsMatched,
} from "./matchPairs.js"
import { calculateScore, submitScore } from "./score.js"
import { startTimer } from "./timer.js"
import {
  buildCardsDeck,
  hideCard,
  hideGameBoardAndShowResult,
  hideOptionsAndShowGameBoard,
  showCard,
  updateMoveCountDisplay,
} from "./updateDOM.js"
import { sleepFor } from "./utils.js"

// An object to hold the game state

const gameState = {
  difficulty: undefined,
  deck: undefined,
  timer: undefined,
  firstCard: undefined,
  flippedCards: 0,
  moveCount: 0,
  matchedPairsCount: 0,
}

// This function starts a new game

const startANewGame = (difficulty) => {
  gameState.difficulty = difficulty
  gameState.deck = getShuffledDeckFromIconArray(difficulty)
  buildCardsDeck(gameState.deck)
  gameState.timer = startTimer()

  hideOptionsAndShowGameBoard()

  const deckElement = document.querySelector(".deck")
  deckElement.addEventListener("click", (event) => {
    makeAMove(event.target.getAttribute("id"))
  })
}

// This function is executed on every turn of the player

const makeAMove = (selectedCard) => {
  // Return false if:
  // 1. The selected card is invalid
  // 2. Selected card was already selected as first card to compare
  // 3. Two cards are already selected and are in process of comparison
  // 4. Selected card is already matched and hidden
  if (
    selectedCard === null ||
    gameState.firstCard === selectedCard ||
    gameState.flippedCards === 2 ||
    isCardAlreadyMatched(selectedCard)
  ) {
    return false
  }

  showCard(selectedCard)

  gameState.flippedCards += 1

  if (gameState.flippedCards === 1) {
    gameState.firstCard = selectedCard
  } else {
    gameState.moveCount += 1
    updateMoveCountDisplay(gameState.moveCount)
    evaluateIfCardsMatch(selectedCard)
  }

  return false
}

// Start of helpers for makeAMove function

const evaluateIfCardsMatch = (selectedCard) => {
  if (areCardsMatched(gameState.deck, gameState.firstCard, selectedCard)) {
    cardsAreMatched(gameState.firstCard, selectedCard)
  } else {
    cardsAreNotMatched(gameState.firstCard, selectedCard)
  }
}

const cardsAreMatched = async (firstCard, secondCard) => {
  await sleepFor(200)
  gameState.matchedPairsCount += 1
  markPairAsMatched(firstCard, secondCard)

  if (
    gameState.matchedPairsCount >= MATCHED_PAIRS_TO_WIN[gameState.difficulty]
  ) {
    endOfGame()
  } else {
    gameState.firstCard = undefined
    gameState.flippedCards = 0
  }
}

const cardsAreNotMatched = async (firstCard, secondCard) => {
  await sleepFor(500)
  hideCard(firstCard)
  hideCard(secondCard)
  gameState.firstCard = undefined
  gameState.flippedCards = 0
}

const endOfGame = () => {
  clearInterval(gameState.timer)
  const time = document.querySelector(".timer-display").innerText
  const calculatedScore = calculateScore(
    gameState.difficulty,
    gameState.moveCount,
    time
  )

  hideGameBoardAndShowResult(gameState.moveCount, time, calculatedScore)
  submitScore(calculatedScore, gameState.difficulty)
}

// End of helpers for makeAMove function

// Event listeners for choice of difficulty and starting the game

const easyDifficulty = document.querySelector(".easy-difficulty")
easyDifficulty.addEventListener("click", () => {
  startANewGame(`Easy`)
})

const normalDifficulty = document.querySelector(".normal-difficulty")
normalDifficulty.addEventListener("click", () => {
  startANewGame(`Normal`)
})

const difficultDifficulty = document.querySelector(".difficult-difficulty")
difficultDifficulty.addEventListener("click", () => {
  startANewGame(`Difficult`)
})
