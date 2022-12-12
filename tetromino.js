import { Square } from "./square.js";

const SHAPE = {
  I: 0,
  J: 1,
  L: 2,
  O: 3,
  T: 4,
  S: 5,
  Z: 6
}

const COLOR = {
  0: "cyan",
  1: "blue",
  2: "orange",
  3: "yellow",
  4: "purple",
  5: "green",
  6: "red"
}

export class Tetromino {
  constructor() {
    this.shape = SHAPE.I;
    this.squares = [];
    for (let i = 0; i < 4; i++) {
      this.squares.push(new Square(4 + i, 0, COLOR[this.shape]));
    }
  }

  move(dx, dy) {
    // Check valid
    for (let square of this.squares) {
      if (!square.isValidMove(dx, dy)) {
        return;
        // TODO: check if landed
      }
    }

    // Move
    this.squares.forEach((square) => {
      square.move(dx, dy);
    });
  }

  rotate() {
    // Black magic, thanks copilot
    // TODO: check valid

    // Rotate
    this.squares.forEach((square) => {
      let dx = square.x - this.squares[1].x;
      let dy = square.y - this.squares[1].y;
      square.x = this.squares[1].x - dy;
      square.y = this.squares[1].y + dx;
    });
  }
}