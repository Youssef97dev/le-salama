"use strict";

/**
 * PRELOAD
 *
 * loading will be end after document is loaded
 */
const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});

/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

/**
 * NAVBAR
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
};

addEventOnElements(navTogglers, "click", toggleNavbar);

/**
 * HEADER & BACK TOP BTN
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
};

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});

/**
 * HERO SLIDER
 */

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
};

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  updateSliderPos();
};

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }

  updateSliderPos();
};

/**
 * PARALLAX EFFECT
 */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {
  x = (event.clientX / window.innerWidth) * 10 - 5;
  y = (event.clientY / window.innerHeight) * 10 - 5;

  // reverse the number eg. 20 -> -20, -5 -> 5
  x = x - x * 2;
  y = y - y * 2;

  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }
});

/**
 * Filter Effect
 */

// Get Element From DOM
const btns = document.querySelectorAll(".filter-buttons li button");
const items = document.querySelectorAll(".grid-list .menu-card");

// Add Click Event to all buttons
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", filterItem);
}
// Add Load Event Listener
window.addEventListener("load", () => {
  // Trigger initial filter
  if (btns.length > 0) {
    filterItem({ target: btns[0] });
  }
});

// Set active button on click
function setActiveBtn(e) {
  btns.forEach((btn) => {
    btn.classList.remove("btn-clicked");
  });
  e.target.classList.add("btn-clicked");
}

// Filter Image
function filterItem(e) {
  // Run active button function
  setActiveBtn(e);

  // Loop Through all items
  items.forEach((item) => {
    item.classList.remove("item-shrink");
    item.classList.add("item-expand");

    // Get data from data attributes
    // get item type data
    const itemType = parseInt(item.dataset.menu);
    // get button type data
    const btnType = parseInt(e.target.dataset.btn);
    console.log("item:", itemType, "btn", btnType);

    if (itemType !== btnType) {
      // Hide item
      item.classList.remove("item-expand");
      item.classList.add("item-shrink");
    }
  });
  console.log(items.length);
}

let isChatboxVisible = false;
const chatbox = document.querySelector(".WA_Chat_Widget .WA_ChatBox");
function hideChatbox() {
  isChatboxVisible = false;
  chatbox.style.display = "none";
}
function toggleChatbox() {
  isChatboxVisible = !isChatboxVisible;
  chatbox.style.display = isChatboxVisible ? "block" : "none";
}

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}
