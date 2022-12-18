import { Board } from "./board.js";

// setup
let board = new Board();
board.rerenderScoreboard();
let paused = true;

// main loop
let mainLoopInterval = setInterval(main, 1000);
function main() {
  if (paused) return;
  // TODO: Accelleration
  board.activeTetromino.move(0, 1);
  board.draw();

  if (board.gameOver) {
    // TODO: Move all game logic into its own class for easy restarting
    clearInterval(mainLoopInterval);
  }
}

// Event listeners
// TODO: check if key is down every few milliseconds instead of listening for keydown
document.addEventListener("keydown", (event) => {
  if (["p", "Escape"].includes(event.key)) {
    togglePause();
    return;
  }
  if (paused) return;

  switch (event.key) {
    case "ArrowLeft":
      board.activeTetromino.move(-1, 0);
      break;
    case "ArrowRight":
      board.activeTetromino.move(1, 0);
      break;
    case "ArrowDown":
      board.activeTetromino.move(0, 1);
      break;
    case "ArrowUp":
      board.activeTetromino.rotate();
      break;
    case " ":
      while (board.activeTetromino.move(0, 1)) {} // Move down until .move returns false
      event.preventDefault(); // Prevent spacebar from pushing buttons
      break;
    case "c":
      board.hold();
      break;
  }
  board.draw();
});

// Pause button
const pauseButton = document.getElementById("play-button");
pauseButton.addEventListener("click", togglePause);
function togglePause() {
  paused = !paused;
  pauseButton.innerText = paused ? "Play" : "Pause";
}