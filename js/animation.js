// animation.js

// Pulse (Heartbeat) Animation for X and O
function applyPulseAnimation(element) {
  element.classList.add("pulse-heart");
  
  // Remove pulse animation after it completes to allow re-triggering
  setTimeout(() => {
    element.classList.remove("pulse-heart");
  }, 1000); // Animation duration is 1 second
}

// Apply Neon Rainbow Animation to X and O
function applyNeonRainbow(element) {
  element.classList.add("neon-rainbow");
}

// Apply Neon Rainbow Animation for Retry Button
const retryButton = document.getElementById("retry-btn");
retryButton.addEventListener("mouseover", () => {
  retryButton.classList.add("neon-rainbow-btn");
});
retryButton.addEventListener("mouseout", () => {
  retryButton.classList.remove("neon-rainbow-btn");
});

// Background Animation (Optional: Dynamic Background Movement)
function applyBackgroundAnimation() {
  document.body.style.animation = "bg-animate 10s linear infinite";
}

// Score Update Animation (Optional: Animate Score)
function updateScoreAnimation(scoreElement) {
  scoreElement.classList.add("score-update");
  setTimeout(() => {
    scoreElement.classList.remove("score-update");
  }, 500); // Animation duration of 0.5s
}

// Handle placing X or O in a square
function placeXO(square, player) {
  if (player === "X") {
    // Apply the neon rainbow and pulse effect
    applyNeonRainbow(square);
    applyPulseAnimation(square);
    square.textContent = "X"; 
  } else if (player === "O") {
    // Apply the neon rainbow and pulse effect
    applyNeonRainbow(square);
    applyPulseAnimation(square);
    square.textContent = "O"; 
  }
}

// Apply Pulse Animation to Score Update
function updatePlayerScore(playerNumber) {
  const scoreElement = document.getElementById(`score${playerNumber}`);
  updateScoreAnimation(scoreElement);
}

// Example usage: Handle player moves, update score, etc.
document.querySelectorAll(".square").forEach(square => {
  square.addEventListener("click", () => {
    if (!square.textContent) { // Only apply animation if square is empty
      // Example applying player X and player O to squares
      placeXO(square, "X"); // Or "O" for player 2
      updatePlayerScore(1); // Update score for player 1
    }
  });
});

window.onload = () => {
  applyBackgroundAnimation();
};
