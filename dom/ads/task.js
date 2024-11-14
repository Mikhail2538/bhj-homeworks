document.addEventListener("DOMContentLoaded", () => {
  const rotators = document.querySelectorAll(".rotator");
  rotators.forEach((rotator) => {
    const cases = rotator.querySelectorAll(".rotator__case");
    let currentIndex = 0;

    function changeCase() {
      const currentCase = cases[currentIndex];
      currentCase.classList.remove("rotator__case_active");
      currentIndex = (currentIndex + 1) % cases.length;
      const nextCase = cases[currentIndex];
      nextCase.style.color = nextCase.getAttribute("data-color") || "black";
      nextCase.classList.add("rotator__case_active");
      const speed = nextCase.getAttribute("data-speed") || 1000;
      setTimeout(changeCase, speed);
    }
    changeCase();
  });
});
