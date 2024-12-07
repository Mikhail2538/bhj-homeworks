document.addEventListener("DOMContentLoaded", () => {
  const pollTitleElement = document.getElementById("poll__title");
  const pollAnswersElement = document.getElementById("poll__answers");
  async function loadPoll() {
    try {
      const response = await fetch(
        "https://students.netoservices.ru/nestjs-backend/poll"
      );
      const data = await response.json();
      pollTitleElement.textContent = data.data.title;
      pollAnswersElement.innerHTML = "";
      data.data.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.className = "poll__answer";
        button.textContent = answer;
        button.addEventListener("click", () => {
          alert("Спасибо, ваш голос засчитан!");
        });
        pollAnswersElement.appendChild(button);
      });
    } catch (error) {
      console.error("Ошибка загрузки данных опроса:", error);
    }
  }
  loadPoll();
});
