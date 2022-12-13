import { board } from './board.js';

export class Square {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    board.squares.push(this);
  }

  draw() {
    if (!this.isStateValid(this.x, this.y)) {
      console.warn(`Invalid location: ${this.x}, ${this.y}`);
      return;
    }
    document.getElementById(`square-${this.x}-${this.y}`).style.backgroundColor = this.color;
  }

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
    if (!this.isStateValid()) {
      console.warn(`Invalid move executed: ${this.x}, ${this.y}`);
      return;
    }
  }

  isStateValid() {
    return board.isValidLocation(this.x, this.y);
  }
}