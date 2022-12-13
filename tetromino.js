import { Square } from "./square.js";

const SHAPE = {
  I: 0,
  J: 1,
  L: 2,
  O: 3,
  T: 4,
  S: 5,
  Z: 6
};

const COLOR = {
  0: "cyan",
  1: "blue",
  2: "orange",
  3: "yellow",
  4: "purple",
  5: "green",
  6: "red"
};

export class Tetromino {
  constructor(board) {
    this.board = board;
    this.shape = SHAPE.I;
    this.squares = [];
    for (let i = 0; i < 4; i++) {
      this.squares.push(new Square(board, 4 + i, 0, COLOR[this.shape]));
    }
  }

  // Update location of squares, undo if invalid
  // Return true if move was successful
  move(dx, dy) {
    // Move
    this.squares.forEach((square) => {
      square.move(dx, dy);
    });

    // Undo if invalid
    if (!this.isStateValid()) {
      this.squares.forEach((square) => {
        square.move(-dx, -dy);
      });
      // Land
      if (dy > 0) {
        this.board.spawnTetromino();
      }
      return false; // Move failed
    }
    return true; // Move was successful
  }

  // Black magic, thanks copilot
  rotate() {
    // Rotate
    this.squares.forEach((square) => {
      let dx = square.x - this.squares[1].x;
      let dy = square.y - this.squares[1].y;
      square.x = this.squares[1].x - dy;
      square.y = this.squares[1].y + dx;
    });

    // Undo if invalid
    if (!this.isStateValid()) {
      this.squares.forEach((square) => {
        let dx = square.x - this.squares[1].x;
        let dy = square.y - this.squares[1].y;
        square.x = this.squares[1].x + dy;
        square.y = this.squares[1].y - dx;
      });
    }
  }

  isStateValid() {
    for (let square of this.squares) {
      if (!square.isStateValid()) {
        return false;
      }
    }
    return true;
  }
}