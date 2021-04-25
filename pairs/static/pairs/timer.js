const resetTimer = (timerDisplay) => {
  let seconds = 0
  const timerVariable = setInterval(() => {
    timerDisplay.innerHTML = seconds++
  }, 1000)

  return timerVariable
}

const startTimer = () => {
  const timerDisplay = document.querySelector(".timer-display")
  const timerVariable = resetTimer(timerDisplay)

  return timerVariable
}

export { startTimer }
