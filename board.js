export class Board {
  constructor() {
    this.squares = [];
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

  isValidLocation(x, y) {
    if (x < 0 || x > 9 || y < 0 || y > 19) {
      return false;
    }
    return !this.isOccupied(x, y);
  }

  isOccupied(x, y) {
    this.squares.forEach((square) => {
      if (square.x == x && square.y == y) {
        return true;
      }
    });
    return false;
  }
}

let board = new Board();
export { board };