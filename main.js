import { board } from "./board.js";
import { Tetromino } from "./tetromino.js";

// globals
let activeTetromino;

// setup
activeTetromino = new Tetromino();
board.draw();

// main loop
setInterval(main, 1000);
function main() {
  activeTetromino.move(0, 1);
  board.draw();
}

// Event listeners
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowLeft":
      activeTetromino.move(-1, 0);
      break;
    case "ArrowRight":
      activeTetromino.move(1, 0);
      break;
    case "ArrowDown":
      activeTetromino.move(0, 1);
      break;
    case "ArrowUp":
      activeTetromino.rotate();
      break;
  }
  board.draw();
});
