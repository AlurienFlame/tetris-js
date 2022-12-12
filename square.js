import { board } from './board.js';

export class Square {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    board.squares.push(this);
  }

  draw() {
    if (!board.isValidLocation(this.x, this.y)) {
      console.warn(`Invalid location: ${this.x}, ${this.y}`);
      return;
    }
    document.getElementById(`square-${this.x}-${this.y}`).style.backgroundColor = this.color;
  }

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  isValidMove(dx, dy) {
    if (!board.isValidLocation(this.x + dx, this.y + dy)) {
      return false;
    }
    return true;
  }
}