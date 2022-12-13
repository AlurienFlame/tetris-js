export class Square {
  constructor(board, x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.board = board;
    board.squares.push(this);
  }

  draw() {
    if (!this.board.isWithinBoundaries(this.x, this.y)) return;
    document.getElementById(`square-${this.x}-${this.y}`).style.backgroundColor = this.color;
  }

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  isStateValid() {
    if (!this.board.isWithinBoundariesExcludingTop(this.x, this.y)) return false;
    for (let square of this.board.squares) {
      if (square === this) continue;
      if (square.x === this.x && square.y === this.y) return false;
    }
    return true;
  }
}