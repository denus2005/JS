let box = document.getElementById("box");
let gameArea = document.getElementById("gameArea");
let startBtn = document.getElementById("startBtn");

let timer;
let score = 0;
let isGameActive = false;
let currentLevel;

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

  box.style.background = color;
  box.style.width = currentLevel.size + "px";
  box.style.height = currentLevel.size + "px";

  document.getElementById("menu").style.display = "none";
  gameArea.style.display = "block";

  isGameActive = true;

  moveBox();
  startRound();
};

function moveBox() {
  const areaRect = gameArea.getBoundingClientRect();

  const maxX = areaRect.width - box.offsetWidth;
  const maxY = areaRect.height - box.offsetHeight;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  box.style.left = x + "px";
  box.style.top = y + "px";
}

function startRound() {
  clearTimeout(timer);
  timer = setTimeout(endGame, currentLevel.time);
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
  alert("Гра завершена! Очки: " + score);

  gameArea.style.display = "none";
  document.getElementById("menu").style.display = "block";
}
