const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");
const modeSelect = document.getElementById("mode");

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;
let gameMode = "single";

const winConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

startGame();

function startGame() {
  cells.forEach(cell => cell.addEventListener("click", cellClicked));
  resetBtn.addEventListener("click", resetGame);
  modeSelect.addEventListener("change", () => {
    gameMode = modeSelect.value;
    resetGame();
  });
  gameMode = modeSelect.value;
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
  running = true;
}

function cellClicked() {
  const index = this.getAttribute("data-index");

  if (options[index] !== "" || !running) return;

  makeMove(index, currentPlayer);
  checkWinner();

  if (gameMode === "single" && currentPlayer === "O" && running) return;

  if (gameMode === "single" && currentPlayer === "X" && running) {
    setTimeout(() => {
      aiMove();
      checkWinner();
    }, 500);
  }
}

function makeMove(index, player) {
  options[index] = player;
  cells[index].textContent = player;
}

function aiMove() {
  const emptyIndices = options.map((val, idx) => val === "" ? idx : null).filter(i => i !== null);
  if (emptyIndices.length === 0) return;

  const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  makeMove(randomIndex, "O");
  currentPlayer = "X";
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWinner() {
  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (options[a] && options[a] === options[b] && options[a] === options[c]) {
      statusText.textContent = `${options[a]} wins!`;
      running = false;
      return;
    }
  }

  if (!options.includes("")) {
    statusText.textContent = "Draw!";
    running = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";

  if (gameMode === "single") {
    if (currentPlayer === "X") {
      statusText.textContent = "Your Turn (X)";
    } else {
      statusText.textContent = "Computer's Turn (O)";
    }
  } else {
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

function resetGame() {
  options = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  running = true;
  cells.forEach(cell => (cell.textContent = ""));
  statusText.textContent = gameMode === "single" ? "Your Turn (X)" : `Player ${currentPlayer}'s Turn`;
}
