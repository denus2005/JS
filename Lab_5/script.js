document.addEventListener("DOMContentLoaded", () => {

  let box = document.getElementById("box");
  let gameArea = document.getElementById("gameArea");
  let startBtn = document.getElementById("startBtn");

  let timer;
  let interval;
  let score = 0;
  let isGameActive = false;
  let currentLevel;

  let startTime; // ⬅️ нове: час старту

  const levels = {
    easy: { time: 4000, size: 70 },
    medium: { time: 2000, size: 55 },
    hard: { time: 1000, size: 40 },
    insane: { time: 700, size: 30 }
  };

  startBtn.onclick = () => {
    const difficulty = document.getElementById("difficulty").value;
    const color = document.getElementById("color").value;

    if (!difficulty || !color) return;

    currentLevel = levels[difficulty];

    score = 0;
    document.getElementById("score").innerText = "Очки: 0";

    document.getElementById("timer").innerText = "Час: 0.0 c";

    box.style.background = color;
    box.style.width = currentLevel.size + "px";
    box.style.height = currentLevel.size + "px";

    document.getElementById("menu").style.display = "none";
    gameArea.style.display = "block";

    isGameActive = true;

    moveBox();
    startRound();
    startTimer();
  };

  function moveBox() {
    const areaRect = gameArea.getBoundingClientRect();

    const maxX = areaRect.width - box.offsetWidth;
    const maxY = areaRect.height - box.offsetHeight;

    box.style.left = Math.random() * maxX + "px";
    box.style.top = Math.random() * maxY + "px";
  }

  function startRound() {
    clearTimeout(timer);
    timer = setTimeout(endGame, currentLevel.time);
  }

  // ⬇️ ТЕПЕР ЦЕ СЕКУНДОМІР (йде вгору)
  function startTimer() {
    clearInterval(interval);

    startTime = Date.now();

    interval = setInterval(() => {
      let seconds = ((Date.now() - startTime) / 1000).toFixed(1);
      document.getElementById("timer").innerText = "Час: " + seconds + " c";
    }, 100);
  }

  box.onclick = () => {
    if (!isGameActive) return;

    score++;
    document.getElementById("score").innerText = "Очки: " + score;

    moveBox();
    startRound();
  };

  function endGame() {
    isGameActive = false;

    clearTimeout(timer);
    clearInterval(interval);

    let finalTime = ((Date.now() - startTime) / 1000).toFixed(1);

    alert("Гра завершена! Ти протримався: " + finalTime + " секунд\nОчки: " + score);

    gameArea.style.display = "none";
    document.getElementById("menu").style.display = "block";
  }

});
