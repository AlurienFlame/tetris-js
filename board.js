import { Tetromino } from "./tetromino.js";

export class Board {
  constructor() {
    this.squares = [];
    this.spawnTetromino();
  }

  draw() {
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 20; y++) {
        document.getElementById(`square-${x}-${y}`).style.backgroundColor = "var(--square-color)";
      }
    }
    for (let square of this.squares) {
      square.draw();
    }
    this.activeTetromino.dropGhost();
  }

  isWithinBoundaries(x, y) {
    return x >= 0 && x < 10 && y >= 0 && y < 20;
  }

  isWithinBoundariesExcludingTop(x, y) {
    return x >= 0 && x < 10 && y < 20;
  }

  spawnTetromino() {
    if (this.gameOver) return;
    this.activeTetromino = new Tetromino(this);
  }

  lose() {
    console.log("Game Over");
    this.gameOver = true;
  }

  clearLines() {
    let combo = 0;
    for (let y = 0; y < 20; y++) {
      // Determine if line is full
      let lineIsFull = true;
      for (let x = 0; x < 10; x++) {
        if (!this.squares.find((square) => square.x === x && square.y === y)) {
          lineIsFull = false;
          break;
        }
      }
      if (lineIsFull) {
        // Clear line
        this.squares = this.squares.filter((square) => square.y !== y);
        this.activeTetromino.squares = this.activeTetromino.squares.filter((square) => square.y !== y);
        this.squares.forEach((square) => {
          if (square.y < y) {
            square.move(0, 1);
          }
        });
        combo++;
      }
    }
    if (combo) {
      console.log(`Combo: ${combo}x`);
    }
  }
}