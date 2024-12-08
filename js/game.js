const klinkSoundPath = "../assets/sounds/klinkkk.mp3";
const bgMusicPath = "../assets/sounds/bg-music.mp3";

// DOM Elements
const board = document.getElementById("board");
const retryButton = document.getElementById("retry-btn");
const score1Element = document.getElementById("score1");
const score2Element = document.getElementById("score2");
const bgMusic = document.getElementById("bg-music");

// Game State
const gridSize = 5;
let boardState = Array(gridSize).fill(null).map(() => Array(gridSize).fill(null));
let currentPlayer = "X";
let playerScores = { X: 0, O: 0 };
let isGameOver = false;

// Sound Effects
const klinkSound = new Audio(klinkSoundPath);

// Initialize Game
function initGame() {
  createBoard();
  resetGame();
}

// Game Board
function createBoard() {
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.dataset.row = row;
      square.dataset.col = col;
      square.addEventListener("click", handleSquareClick);
      board.appendChild(square);
    }
  }
}

// Handle Square Click
function handleSquareClick(event) {
  if (isGameOver) return;

  const square = event.target;
  const row = parseInt(square.dataset.row);
  const col = parseInt(square.dataset.col);

  // Check if the square is already filled
  if (boardState[row][col]) return;

  // Update board state and UI
  boardState[row][col] = currentPlayer;
  square.textContent = currentPlayer;
  square.classList.add("neon-rainbow");
  klinkSound.play();

  // Update score and check for assembled patterns
  updateScore(row, col);
  checkForWin();

  // Switch player
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

// Update Score
function updateScore(row, col) {
  const player = boardState[row][col];
  const assembled = checkAssembledPatterns(row, col);

  if (assembled) {
    playerScores[player]++;
    updateScoreDisplay();
    animateAssembledPatterns(row, col);
  }
}

// Check Assembled Patterns (Row, Column, Diagonals)
function checkAssembledPatterns(row, col) {
  const player = boardState[row][col];
  const winLength = 3; // Length to assemble a pattern
  let assembled = false;

  // Check Row
  if (boardState[row].filter(cell => cell === player).length >= winLength) {
    assembled = true;
  }

  // Check Column
  if (boardState.map(r => r[col]).filter(cell => cell === player).length >= winLength) {
    assembled = true;
  }

  // Check Diagonals
  const diag1 = [];
  const diag2 = [];
  for (let i = 0; i < gridSize; i++) {
    diag1.push(boardState[i][i]);
    diag2.push(boardState[i][gridSize - i - 1]);
  }
  if (diag1.filter(cell => cell === player).length >= winLength) assembled = true;
  if (diag2.filter(cell => cell === player).length >= winLength) assembled = true;

  return assembled;
}

// Score Update
function updateScoreDisplay() {
  score1Element.textContent = playerScores.X;
  score2Element.textContent = playerScores.O;
}

// Animate Assembled Patterns
function animateAssembledPatterns(row, col) {
  // Add a glowing animation or highlight to winning squares
  document.querySelectorAll(".square").forEach(square => {
    if (square.dataset.row == row || square.dataset.col == col) {
      square.classList.add("highlight");
    }
  });
}

// Check for Game End
function checkForWin() {
  const totalMoves = boardState.flat().filter(Boolean).length;

  // End the game if all squares are filled
  if (totalMoves === gridSize * gridSize) {
    isGameOver = true;
    declareWinner();
  }
}

// Declare Winner
function declareWinner() {
  const winner =
    playerScores.X > playerScores.O
      ? "Player 1 (X)"
      : playerScores.O > playerScores.X
      ? "Player 2 (O)"
      : "No Winner (It's a draw!)";

  alert(`Kudos! Winner: ${winner}`);
}

// Reset Game
function resetGame() {
  boardState = Array(gridSize).fill(null).map(() => Array(gridSize).fill(null));
  currentPlayer = "X";
  playerScores = { X: 0, O: 0 };
  isGameOver = false;

  // Clear UI
  document.querySelectorAll(".square").forEach(square => {
    square.textContent = "";
    square.classList.remove("neon-rainbow", "highlight");
  });

  updateScoreDisplay();
}

// Event Listeners
retryButton.addEventListener("click", resetGame);

// Start Game
initGame();
