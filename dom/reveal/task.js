function isElementInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

function revealElementsOnScroll() {
  const revealElements = document.querySelectorAll(".reveal");

  revealElements.forEach((element) => {
    if (isElementInViewport(element)) {
      element.classList.add("reveal_active");
    } else {
      element.classList.remove("reveal_active");
    }
  });
}

window.addEventListener("scroll", revealElementsOnScroll);
