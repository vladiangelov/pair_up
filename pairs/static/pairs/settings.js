// This script is for the settings screen only
const names = {
  it: `IT Company Logos`,
  animals: `Animal Pictures`,
  sports: `Sports Icons`,
}

const buildSettings = () => {
  const localStorage = window.localStorage
  const chosenSetting = localStorage.getItem(`settings`) || `it`
  const options = [`it`, `animals`, `sports`]
  const settingsElement = document.querySelector(".settings")

  const settingsFragment = document.createDocumentFragment()
  const titleElement = document.createElement("div")
  titleElement.setAttribute("class", "options-title")
  titleElement.innerHTML = `Select a card deck theme`
  settingsFragment.appendChild(titleElement)

  options.forEach((option, optionIndex) => {
    const liElement = document.createElement("li")
    liElement.setAttribute("id", `${optionIndex}`)
    if (chosenSetting === option) {
      liElement.setAttribute("class", "option chosen-option")
      liElement.innerHTML = `${names[option]} (SELECTED)`
    } else {
      liElement.setAttribute("class", "option")
      liElement.addEventListener("click", () => {
        changeSettings(option)
        location.reload()
      })
      liElement.innerHTML = names[option]
    }

    settingsFragment.appendChild(liElement)
  })
  settingsElement.appendChild(settingsFragment)
}

const changeSettings = (option) => {
  const localStorage = window.localStorage
  localStorage.setItem(`settings`, option)
}

buildSettings()
