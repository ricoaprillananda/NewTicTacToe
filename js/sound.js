console.log("sound.js loaded");

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

const clickSound = new Audio('../assets/sounds/click.mp3');

bgMusic.loop = true;

// Play background music on loop
function playBackgroundMusic() {
  console.log("Playing background music");
  bgMusic.play().then(() => {
    console.log("Background music is playing");
  }).catch((error) => {
    console.error("Error playing background music: ", error);
  });
}

// Stop background music
function stopBackgroundMusic() {
  console.log("Stopping background music");
  bgMusic.pause();
  bgMusic.currentTime = 0;  // Reset the music
}

// Sound effect
function playSoundEffect(sound) {
  sound.play().then(() => {
    console.log(`${sound.src} played successfully`);
  }).catch((error) => {
    console.error("Error playing sound: ", error);
  });
}

// Event listeners 
document.querySelectorAll(".square").forEach(square => {
  square.addEventListener("mouseover", () => playSoundEffect(hoverSound));
  square.addEventListener("click", () => playSoundEffect(clickSound));
});

document.querySelectorAll(".move-btn").forEach(button => {
  button.addEventListener("click", () => playSoundEffect(moveSound));
});

document.querySelectorAll(".win-btn").forEach(button => {
  button.addEventListener("click", () => playSoundEffect(winSound));
});

// Win sound when the player wins
function handleWin(player) {
  console.log("Player wins: " + player);
  playSoundEffect(winSound);
  // Handle the win logic
}

// Start the game by playing background music
window.onload = () => {
  playBackgroundMusic();
};
