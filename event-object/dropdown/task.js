document.addEventListener("DOMContentLoaded", () => {
  const dropdowns = document.querySelectorAll(".dropdown");
  dropdowns.forEach((dropdown) => {
    const value = dropdown.querySelector(".dropdown__value");
    const list = dropdown.querySelector(".dropdown__list");
    const items = dropdown.querySelectorAll(".dropdown__item");
    value.addEventListener("click", () => {
      list.classList.toggle("dropdown__list_active");
    });
    items.forEach((item) => {
      const link = item.querySelector(".dropdown__link");
      link.addEventListener("click", (event) => {
        event.preventDefault();
        value.textContent = link.textContent;
        list.classList.remove("dropdown__list_active");
      });
    });
  });
  document.addEventListener("click", (event) => {
    dropdowns.forEach((dropdown) => {
      if (!dropdown.contains(event.target)) {
        const list = dropdown.querySelector(".dropdown__list");
        list.classList.remove("dropdown__list_active");
      }
    });
  });
});
