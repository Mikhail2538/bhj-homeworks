document.addEventListener("DOMContentLoaded", () => {
  const signin = document.getElementById("signin");
  const signinForm = document.getElementById("signin__form");
  const signinBtn = document.getElementById("signin__btn");
  const welcome = document.getElementById("welcome");
  const userIdSpan = document.getElementById("user_id");
  const savedUserId = localStorage.getItem("user_id");
  if (savedUserId) {
    displayWelcome(savedUserId);
  }
  signinForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(signinForm);
    const requestData = Object.fromEntries(formData.entries());
    fetch("https://students.netoservices.ru/nestjs-backend/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("user_id", data.user_id);
          displayWelcome(data.user_id);
        } else {
          alert("Неверный логин/пароль");
        }
      })
      .catch((error) => {
        console.error("Ошибка авторизации:", error);
        alert("Произошла ошибка, попробуйте снова.");
      });
  });
  function displayWelcome(userId) {
    signin.classList.remove("signin_active");
    welcome.classList.add("welcome_active");
    userIdSpan.textContent = userId;
  }
});
