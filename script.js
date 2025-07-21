const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

const winConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
  [0, 4, 8], [2, 4, 6]             // diagonals
];

startGame();

function startGame() {
  cells.forEach(cell => cell.addEventListener("click", cellClicked));
  resetBtn.addEventListener("click", resetGame);
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  running = true;
}

function cellClicked() {
  const index = this.getAttribute("data-index");

  if (options[index] !== "" || !running) return;

  updateCell(this, index);
  checkWinner();
}

function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];
    if (options[a] && options[a] === options[b] && options[a] === options[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    running = false;
  } else if (!options.includes("")) {
    statusText.textContent = "Draw!";
    running = false;
  } else {
    changePlayer();
  }
}

function resetGame() {
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => cell.textContent = "");
  running = true;
}
