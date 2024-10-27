let count = 0;
const clicker__counter = document.getElementById("clicker__counter");
const cookie = document.getElementById("cookie");
cookie.onclick = function () {
  count++;
  clicker__counter.textContent = count;
  if (cookie.width === 200) {
    cookie.width = 150;
  } else {
    cookie.width = 200;
  }
};
