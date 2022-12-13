export class Square {
  constructor(board, x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.board = board;
  }

  draw() {
    if (!this.board.isWithinBoundaries(this.x, this.y)) return;
    document.getElementById(`square-${this.x}-${this.y}`).style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue(this.color);
  }

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  moveTo(x, y) {
    this.x = x;
    this.y = y;
  }

  isStateValid() {
    if (!this.board.isWithinBoundariesExcludingTop(this.x, this.y)) return false;
    for (let square of this.board.squares) {
      if (square === this) continue;
      if (this.board.activeTetromino.squares.includes(square)) continue;
      if (square.x === this.x && square.y === this.y) return false;
    }
    return true;
  }

  getGhost() {
    return new Square(this.board, this.x, this.y, this.color + "-ghost");
  }
}