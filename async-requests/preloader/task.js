document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const itemsContainer = document.getElementById("items");
  const apiUrl =
    "https://students.netoservices.ru/nestjs-backend/slow-get-courses";
  function createCurrencyItem(charCode, value) {
    const item = document.createElement("div");
    item.classList.add("item");

    const codeDiv = document.createElement("div");
    codeDiv.classList.add("item__code");
    codeDiv.textContent = charCode;

    const valueDiv = document.createElement("div");
    valueDiv.classList.add("item__value");
    valueDiv.textContent = value;

    const currencyDiv = document.createElement("div");
    currencyDiv.classList.add("item__currency");
    currencyDiv.textContent = "руб.";
    
    item.appendChild(codeDiv);
    item.appendChild(valueDiv);
    item.appendChild(currencyDiv);
    return item;
  }
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка загрузки: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const currencies = data.response.Valute;
      itemsContainer.innerHTML = "";
      for (const key in currencies) {
        const currency = currencies[key];
        const item = createCurrencyItem(currency.CharCode, currency.Value);
        itemsContainer.appendChild(item);
      }
    })
    .catch((error) => {
      console.error("Ошибка загрузки данных:", error);
    })
    .finally(() => {
      loader.classList.remove("loader_active");
    });
});
