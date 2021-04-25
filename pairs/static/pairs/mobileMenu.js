const hamburgerMenu = document.querySelector(".hamburger-menu")
const mobileMenu = document.querySelector(".mobile-menu")
hamburgerMenu.addEventListener("click", () => {
  if (mobileMenu.getAttribute("style") == "display: block") {
    mobileMenu.setAttribute("style", "display: none")
  } else {
    mobileMenu.setAttribute("style", "display: block")
  }
})
