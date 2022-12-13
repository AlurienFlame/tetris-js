import { Square } from "./square.js";

const SHAPES = {
  I: {
    offsets: [[0, 0], [1, 0], [2, 0], [3, 0]],
    color: "cyan"
  },
  J: {
    offsets: [[0, 0], [1, 0], [2, 0], [2, 1]],
    color: "blue"
  },
  L: {
    offsets: [[0, 0], [1, 0], [2, 0], [0, 1]],
    color: "orange"
  },
  O: {
    offsets: [[0, 0], [1, 0], [0, 1], [1, 1]],
    color: "yellow"
  },
  T: {
    offsets: [[0, 0], [1, 0], [2, 0], [1, 1]],
    color: "purple"
  },
  S: {
    offsets: [[0, 0], [1, 0], [1, 1], [2, 1]],
    color: "green"
  },
  Z: {
    offsets: [[0, 1], [1, 1], [1, 0], [2, 0]],
    color: "red"
  }
};

export class Tetromino {
  constructor(board) {
    this.board = board;
    this.shape = Object.values(SHAPES)[Math.floor(Math.random() * Object.values(SHAPES).length)];
    this.squares = [];

    // Generate squares
    for (let i = 0; i < 4; i++) {
      this.squares.push(new Square(board, this.shape.offsets[i][0] + 3, this.shape.offsets[i][1] - 1, this.shape.color));
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
    // TODO: Allow rotation against top of map
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