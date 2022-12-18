import { Tetromino } from "./tetromino.js";

export class Board {
  constructor() {
    this.score = 0;
    this.squares = [];
    this.spawnTetromino();
  }

  draw() {
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 20; y++) {
        document.getElementById(`square-${x}-${y}`).style.backgroundColor = "var(--square-color)";
      }
    }
    for (let square of this.squares) {
      square.draw();
    }
    this.activeTetromino.dropGhost();
  }

  isWithinBoundaries(x, y) {
    return x >= 0 && x < 10 && y >= 0 && y < 20;
  }

  isWithinBoundariesExcludingTop(x, y) {
    return x >= 0 && x < 10 && y < 20;
  }

  spawnTetromino() {
    if (this.gameOver) return;
    this.activeTetromino = new Tetromino(this);
  }

  lose() {
    if (this.gameOver) return;
    console.log("Game Over");
    this.gameOver = true;
    this.addToScoreboard(this.score);
  }

  // Update local storage to contain the top 10 scores, including this if it's high enough
  addToScoreboard(score) {
    let scores = JSON.parse(localStorage.getItem("scores")) || [];
    scores.push(score);
    scores.sort((a, b) => b - a);
    scores = scores.slice(0, 10);
    localStorage.setItem("scores", JSON.stringify(scores));
  }

  rerenderScoreboard() {
    let scores = JSON.parse(localStorage.getItem("scores")) || [];
    let scoreboard = document.getElementById("scoreboard");
    scoreboard.innerHTML = "";
    for (let score of scores) {
      let scoreElement = document.createElement("div");
      scoreElement.innerText = score;
      scoreboard.appendChild(scoreElement);
    }
  }

  clearLines() {
    let combo = 0;
    for (let y = 0; y < 20; y++) {
      // Determine if line is full
      let lineIsFull = true;
      for (let x = 0; x < 10; x++) {
        if (!this.squares.find((square) => square.x === x && square.y === y)) {
          lineIsFull = false;
          break;
        }
      }
      if (lineIsFull) {
        // Clear line
        this.squares = this.squares.filter((square) => square.y !== y);
        this.activeTetromino.squares = this.activeTetromino.squares.filter((square) => square.y !== y);
        this.squares.forEach((square) => {
          if (square.y < y) {
            square.move(0, 1);
          }
        });
        combo++;
      }
    }
    this.addScore((combo ** 2) * 1000); // TODO: Amplify by game length
  }

  addScore(delta) {
    this.score += delta;
    document.getElementById("score-num").innerText = this.score;
    // TODO: Track high score in local storage
  }

  hold() {
    if (this.activeTetromino?.alreadyHeld) return;

    // Remove active tetromino from board
    this.squares = this.squares.filter((square) => !this.activeTetromino.squares.includes(square));
    this.activeTetromino.moveTo(0, 0);
    this.activeTetromino.alreadyHeld = true;

    if (this.heldTetromino) {
      // Add held tetromino to board
      this.squares.push(...this.heldTetromino.squares);
      this.heldTetromino.moveTo(3, -2);
    }

    // Swap variables
    [this.heldTetromino, this.activeTetromino] = [this.activeTetromino, this.heldTetromino];

    // Spawn new tetromino if necessary
    if (!this.activeTetromino) {
      this.spawnTetromino();
    }

    // Update held tetromino display
    for (let square of document.getElementById("holder").children) {
      square.style.backgroundColor = "var(--square-color)";
    }
    for (let square of this.heldTetromino.squares) {
      if (square.x < 0 || square.x > 3 || square.y < 0 || square.y > 3) continue;
      document.getElementById(`held-${square.x}-${square.y}`).style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue(square.color);
    }
  }
}