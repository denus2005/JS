document.addEventListener("DOMContentLoaded", () => {
  const box = document.getElementById("box");
  const gameArea = document.getElementById("gameArea");
  const startBtn = document.getElementById("startBtn");

  let interval;
  let isGameActive = false;

  let baseTime;
  let timeLeft;

  const levels = {
    easy: { time: 5, size: 70 },
    medium: { time: 4, size: 55 },
    hard: { time: 3, size: 40 },
    insane: { time: 2, size: 30 }
  };

  function updateTimerUI() {
    document.getElementById("timer").innerText = "Час: " + timeLeft;
  }

  function startCountdown() {
    clearInterval(interval);

    timeLeft = baseTime;
    updateTimerUI();

    interval = setInterval(() => {
      timeLeft--;
      updateTimerUI();

      if (timeLeft <= 0) {
        endGame(false);
      }
    }, 1000);
  }

  function resetTimer() {
    timeLeft = baseTime;
    updateTimerUI();
  }

  function moveBox() {
    const rect = gameArea.getBoundingClientRect();
    const x = Math.random() * (rect.width - box.offsetWidth);
    const y = Math.random() * (rect.height - box.offsetHeight);

    box.style.left = x + "px";
    box.style.top = y + "px";
  }

  startBtn.onclick = () => {
    const difficulty = document.getElementById("difficulty").value;
    const color = document.getElementById("color").value;

    if (!difficulty || !color) return;

    const level = levels[difficulty];

    baseTime = level.time;

    document.getElementById("score").innerText = "Очки: 0";

    timeLeft = baseTime;
    updateTimerUI();

    box.style.background = color;
    box.style.width = level.size + "px";
    box.style.height = level.size + "px";

    document.getElementById("menu").style.display = "none";
    gameArea.style.display = "block";

    isGameActive = true;

    moveBox();
    startCountdown();
  };

  box.onclick = () => {
    if (!isGameActive) return;

    // додаємо очко
    let scoreEl = document.getElementById("score");
    let score = parseInt(scoreEl.innerText.split(": ")[1]);
    score++;
    scoreEl.innerText = "Очки: " + score;

    // нова позиція + перезапуск таймера
    moveBox();
    resetTimer();
  };

  function endGame(won) {
    isGameActive = false;
    clearInterval(interval);

    if (won) {
      alert("Ти виграв! 🎉");
    } else {
      alert("Час вийшов! 💥 Програш");
    }

    gameArea.style.display = "none";
    document.getElementById("menu").style.display = "block";
  }
});
