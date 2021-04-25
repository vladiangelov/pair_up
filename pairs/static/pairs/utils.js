const sleepFor = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export { sleepFor }
