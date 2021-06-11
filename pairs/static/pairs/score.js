const buildSubmitScorePayload = (score, difficulty) => {
  return {
    method: "POST",
    body: JSON.stringify({
      score,
      difficulty,
    }),
  }
}

// Only private functions above

const submitScore = (score, difficulty) => {
  const url = `/submit_result`

  const payload = buildSubmitScorePayload(score, difficulty)
  fetch(url, payload)
    .then((response) => response.json())
    .then((result) => {
      if (result.message == "Guest scores not saved") {
        const resultNotSavedElement =
          document.querySelector(".results-not-saved")
        resultNotSavedElement.setAttribute("style", "display: block")
      } else {
        console.log(`Result score submitted`)
      }
    })

  return false
}

const calculateScore = (difficulty, moves, time) => {
  let maxTime
  let maxMoves

  switch (difficulty) {
    case `Easy`:
      maxTime = 20
      maxMoves = 20
      break
    case `Normal`:
      maxTime = 40
      maxMoves = 30
      break
    case `Difficult`:
      maxTime = 60
      maxMoves = 40
      break
  }

  const timeLeft = maxTime - time
  const movesLeft = maxMoves - moves
  const score = timeLeft + movesLeft * 2

  return score
}

export { calculateScore, submitScore }
