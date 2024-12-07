document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const progress = document.getElementById("progress");
  const sendButton = document.getElementById("send");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const fileInput = document.getElementById("file");
    const file = fileInput.files[0];
    if (!file) {
      alert("Пожалуйста, выберите файл для загрузки.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", form.action, true);
    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        const percentComplete = event.loaded / event.total;
        progress.value = percentComplete;
      }
    });
    xhr.addEventListener("load", () => {
      if (xhr.status === 200) {
        alert("Файл успешно загружен!");
        progress.value = 1.0;
      } else {
        alert("Произошла ошибка при загрузке файла.");
      }
    });
    xhr.addEventListener("error", () => {
      alert("Произошла ошибка сети.");
    });
    xhr.send(formData);
  });
});
