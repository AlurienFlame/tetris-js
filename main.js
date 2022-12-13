import { Board } from "./board.js";

// setup
let board = new Board();
board.draw();

// main loop
let mainLoopInterval = setInterval(main, 1000);
function main() {
  board.activeTetromino.move(0, 1);
  board.draw();

  if (board.gameOver) {
    clearInterval(mainLoopInterval);
  }
}

// Event listeners
// TODO: check if key is down every few milliseconds instead of listening for keydown
document.addEventListener("keydown", (event) => {
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
      break;
  }
  board.draw();
});
