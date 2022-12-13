import { Square } from "./square.js";

const SHAPES = [
  {
    offsets: [[0, 0], [1, 0], [2, 0], [3, 0]],
    id: "I"
  },
  {
    offsets: [[0, 0], [1, 0], [2, 0], [2, 1]],
    id: "J"
  },
  {
    offsets: [[0, 0], [1, 0], [2, 0], [0, 1]],
    id: "L"
  },
  {
    offsets: [[0, 0], [1, 0], [0, 1], [1, 1]],
    id: "O"
  },
  {
    offsets: [[0, 0], [1, 0], [2, 0], [1, 1]],
    id: "T"
  },
  {
    offsets: [[0, 0], [1, 0], [1, 1], [2, 1]],
    id: "S"
  },
  {
    offsets: [[0, 1], [1, 1], [1, 0], [2, 0]],
    id: "Z"
  }
];

export class Tetromino {
  constructor(board, isGhost = false) {
    this.board = board;
    this.isGhost = isGhost;
    let shape = Object.values(SHAPES)[Math.floor(Math.random() * Object.values(SHAPES).length)];
    this.squares = [];

    // Generate squares
    if (!isGhost) {
      for (let i = 0; i < 4; i++) {
        let square = new Square(board, shape.offsets[i][0] + 3, shape.offsets[i][1] - 2, `--color-${shape.id}`);
        this.squares.push(square);
        this.board.squares.push(square);
      }
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
        this.land();
      }
      return false; // Move failed
    }
    return true; // Move was successful
  }

  // Black magic, thanks copilot
  rotate() {
    // Rotate
    // FIXME: square rotates wrong - implement centers of rotation
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

  land() {
    if (this.isGhost) return;
    this.board.clearLines();
    this.board.spawnTetromino();
    for (let square of this.squares) {
      if (square.y <= 0) {
        this.board.lose();
      }
    }
  }

  dropGhost() {
    let ghost = new Tetromino(this.board, true);
    ghost.squares = this.squares.map((square) => square.getGhost());
    while (ghost.move(0, 1)) { }
    for (let square of ghost.squares) {
      square.draw();
    }
  }
}