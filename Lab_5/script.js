document.addEventListener("DOMContentLoaded", () => {

  const box = document.getElementById("box");
  const gameArea = document.getElementById("gameArea");
  const startBtn = document.getElementById("startBtn");

  let interval;
  let isGameActive = false;
  let startTime;

  const levels = {
    easy: 70,
    medium: 55,
    hard: 40,
    insane: 30
  };

  startBtn.onclick = () => {
    const difficulty = document.getElementById("difficulty").value;
    const color = document.getElementById("color").value;

    if (!difficulty || !color) return;

    document.getElementById("score").innerText = "Очки: 0";
    document.getElementById("timer").innerText = "Час: 0.0 c";

    box.style.background = color;
    box.style.width = levels[difficulty] + "px";
    box.style.height = levels[difficulty] + "px";

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
      const sec = ((Date.now() - startTime) / 1000).toFixed(1);
      document.getElementById("timer").innerText = "Час: " + sec + " c";
    }, 100);
  }

  function stopTimer() {
    clearInterval(interval);
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

    isGameActive = false;
    stopTimer();

    const finalTime = ((Date.now() - startTime) / 1000).toFixed(1);

    alert("Ти натиснув! Час до кліку: " + finalTime + " секунд");

    gameArea.style.display = "none";
    document.getElementById("menu").style.display = "block";
  };

});
