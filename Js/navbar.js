const menuOpen = document.getElementById("menu-open");

const menuClose = document.getElementById("close-navbar");

const menuContainer = document.querySelector(".menu-icon-container");

const mainNav = document.getElementById("nav");

const redBox = document.getElementById("red-box");

const blackBox = document.getElementById("black-box");

let screenWidth = screen.width;
menuOpen.addEventListener("click", function () {
  blackBox.classList.remove("black-box-off");
  redBox.classList.remove("red-box-off");
  mainNav.classList.remove("nav-off");

  blackBox.classList.add("black-box-on");
  redBox.classList.add("red-box-on");
  mainNav.classList.add("nav-on");

  mainNav.style.transform = "translateX(-100%)";
  redBox.style.transform = "translateX(-100%)";
  blackBox.style.transform = "translateX(-100%)";
});

menuClose.addEventListener("click", function () {
  blackBox.classList.add("black-box-off");
  redBox.classList.add("red-box-off");
  mainNav.classList.add("nav-off");

  blackBox.classList.remove("black-box-on");
  redBox.classList.remove("red-box-on");
  mainNav.classList.remove("nav-on");

  mainNav.style.transform = "translateX(0%)";
  redBox.style.transform = "translateX(0%)";
  blackBox.style.transform = "translateX(0%)";
});

window.addEventListener("resize", function () {
  if (window.innerWidth > 730) {
    if (
      blackBox.classList.contains("black-box-on") &&
      redBox.classList.contains("red-box-on") &&
      mainNav.classList.contains("nav-on")
    ) {
      mainNav.style.transform = "translateX(0%)";

      blackBox.classList.remove("black-box-on");
      redBox.classList.remove("red-box-on");
      mainNav.classList.remove("nav-on");
    }
  }
});
