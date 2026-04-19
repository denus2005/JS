let board = [];
let initialBoard = [];
let moves = 0;
let timer = 0;
let interval = null;
let currentLevelIndex = -1;
let levels = [];

const boardEl = document.getElementById("board");
const movesEl = document.getElementById("moves");
const timerEl = document.getElementById("timer");
const targetEl = document.getElementById("target");

async function loadLevels() {
  const res = await fetch("levels.json");
  levels = await res.json();
  newGame();
}

function newGame() {
  // вибір іншого рівня
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * levels.length);
  } while (newIndex === currentLevelIndex);

  currentLevelIndex = newIndex;

  const level = levels[currentLevelIndex];

  board = JSON.parse(JSON.stringify(level.grid));
  initialBoard = JSON.parse(JSON.stringify(level.grid));

  moves = 0;
  timer = 0;

  targetEl.textContent = level.target;
  movesEl.textContent = moves;
  timerEl.textContent = timer;

  startTimer();
  render();
}

function restartGame() {
  board = JSON.parse(JSON.stringify(initialBoard));
  moves = 0;
  timer = 0;

  movesEl.textContent = moves;
  timerEl.textContent = timer;

  startTimer();
  render();
}

function startTimer() {
  clearInterval(interval);
  interval = setInterval(() => {
    timer++;
    timerEl.textContent = timer;
  }, 1000);
}

function render() {
  boardEl.innerHTML = "";

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.classList.add(board[i][j] ? "on" : "off");

      cell.addEventListener("click", () => handleClick(i, j));

      boardEl.appendChild(cell);
    }
  }
}

function toggle(i, j) {
  if (i >= 0 && i < 5 && j >= 0 && j < 5) {
    board[i][j] = board[i][j] ? 0 : 1;
  }
}

function handleClick(i, j) {
  toggle(i, j);
  toggle(i - 1, j);
  toggle(i + 1, j);
  toggle(i, j - 1);
  toggle(i, j + 1);

  moves++;
  movesEl.textContent = moves;

  render();
  checkWin();
}

function checkWin() {
  for (let row of board) {
    for (let cell of row) {
      if (cell === 1) return;
    }
  }

  clearInterval(interval);

  setTimeout(() => {
    alert(`Перемога! Ходи: ${moves}, Час: ${timer}`);
  }, 100);
}

document.getElementById("newGame").addEventListener("click", newGame);
document.getElementById("restart").addEventListener("click", restartGame);

loadLevels();
