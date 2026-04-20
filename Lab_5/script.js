document.addEventListener("DOMContentLoaded", () => {

  const box = document.getElementById("box");
  const gameArea = document.getElementById("gameArea");
  const startBtn = document.getElementById("startBtn");

  let interval;
  let timer;
  let isGameActive = false;

  let timeLeft;

  const levels = {
    easy: { time: 5, size: 70 },
    medium: { time: 4, size: 55 },
    hard: { time: 3, size: 40 },
    insane: { time: 2, size: 30 }
  };

  startBtn.onclick = () => {
    const difficulty = document.getElementById("difficulty").value;
    const color = document.getElementById("color").value;

    if (!difficulty || !color) return;

    const level = levels[difficulty];

    timeLeft = level.time;

    document.getElementById("score").innerText = "Очки: 0";
    document.getElementById("timer").innerText = "Час: " + timeLeft;

    box.style.background = color;
    box.style.width = level.size + "px";
    box.style.height = level.size + "px";

    document.getElementById("menu").style.display = "none";
    gameArea.style.display = "block";

    isGameActive = true;

    moveBox();
    startCountdown();
  };

  function startCountdown() {
    clearInterval(interval);

    interval = setInterval(() => {
      timeLeft--;

      document.getElementById("timer").innerText = "Час: " + timeLeft;

      if (timeLeft <= 0) {
        endGame(false); // програш
      }
    }, 1000);
  }

  function moveBox() {
    const rect = gameArea.getBoundingClientRect();

    const x = Math.random() * (rect.width - box.offsetWidth);
    const y = Math.random() * (rect.height - box.offsetHeight);

    box.style.left = x + "px";
    box.style.top = y + "px";
  }

  box.onclick = () => {
    if (!isGameActive) return;

    endGame(true); // виграв (встиг клікнути)
  };

  function endGame(won) {
    isGameActive = false;

    clearInterval(interval);

    if (won) {
      alert("Ти встиг клікнути! 🎉");
    } else {
      alert("Час вийшов! 💥 Програш");
    }

    gameArea.style.display = "none";
    document.getElementById("menu").style.display = "block";
  }

});
