document.addEventListener("DOMContentLoaded", () => {

  let box = document.getElementById("box");
  let gameArea = document.getElementById("gameArea");
  let startBtn = document.getElementById("startBtn");

  let interval;
  let score = 0;
  let isGameActive = false;

  let startTime;

  const levels = {
    easy: { size: 70 },
    medium: { size: 55 },
    hard: { size: 40 },
    insane: { size: 30 }
  };

  startBtn.onclick = () => {
    const difficulty = document.getElementById("difficulty").value;
    const color = document.getElementById("color").value;

    if (!difficulty || !color) return;

    score = 0;
    document.getElementById("score").innerText = "Очки: 0";

    box.style.background = color;
    box.style.width = levels[difficulty].size + "px";
    box.style.height = levels[difficulty].size + "px";

    document.getElementById("menu").style.display = "none";
    gameArea.style.display = "block";

    isGameActive = true;

    startTime = Date.now();
    startTimer();
    moveBox();
  };

  function startTimer() {
    clearInterval(interval);

    interval = setInterval(() => {
      let seconds = ((Date.now() - startTime) / 1000).toFixed(1);
      document.getElementById("timer").innerText = "Час: " + seconds + " c";
    }, 100);
  }

  function stopTimer() {
    clearInterval(interval);
  }

  function moveBox() {
    const rect = gameArea.getBoundingClientRect();

    const maxX = rect.width - box.offsetWidth;
    const maxY = rect.height - box.offsetHeight;

    box.style.left = Math.random() * maxX + "px";
    box.style.top = Math.random() * maxY + "px";
  }

  box.onclick = () => {
    if (!isGameActive) return;

    score++;
    document.getElementById("score").innerText = "Очки: " + score;

    let finalTime = ((Date.now() - startTime) / 1000).toFixed(1);

    isGameActive = false;
    stopTimer();

    alert("Ти клікнув! Час: " + finalTime + " секунд");

    gameArea.style.display = "none";
    document.getElementById("menu").style.display = "block";
  };

});
