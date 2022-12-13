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
    this.squares.forEach((square) => {
      square.draw();
    });
  }

  isWithinBoundaries(x, y) {
    return x >= 0 && x < 10 && y >= 0 && y < 20;
  }
  
  spawnTetromino() {
    if (this.activeTetromino && !this.activeTetromino.isStateValid()) {
      // Game Over
      return;
    }

    this.activeTetromino = new Tetromino(this);
  }
}