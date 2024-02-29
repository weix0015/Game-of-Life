// "use strict";

window.addEventListener("load", start);

const GRID_WIDTH = 40;
const GRID_HEIGHT = 25;
let model = [];
let generations = 0;
let intervalId = null;

let speed = 200;

// ************* CONTROLLER *************

function start() {
  console.log("JS running.");
  createModel();
  createBoard();
  fillBoard();
}

document.getElementById("start").addEventListener("click", startGame);
document.getElementById("stop").addEventListener("click", stopGame);

function startGame() {
  if(intervalId === null) {
    const iterationsPerSecond = parseInt(document.getElementById("speedRange").value);
    updateSpeed(iterationsPerSecond);
  }
}

function stopGame() {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

function updateSpeed(iterationsPerSecond) {
  if (iterationsPerSecond > 0) {
    // Calculate the time between iterations
    const intervalTime = (1000 / iterationsPerSecond);
    
    clearInterval(intervalId);
    intervalId = setInterval(nextGeneration, intervalTime);
  } else {
    clearInterval(intervalId);
    intervalId = null;
  }
}


// ************* VIEW *************
emptyBtn = document.getElementById("empty");
addRandomBtn = document.getElementById("random");

emptyBtn.addEventListener("click", emptyBoard);
addRandomBtn.addEventListener("click", addRandom);

document.getElementById("speedRange").addEventListener("input", function() {
  const iterationsPerSecond = parseInt(this.value);
  updateSpeed(iterationsPerSecond);
});

function emptyBoard() {
  model = model.map(row => row.map(() => 0));
  stopGame();
  updateView();
  generations = 0;
  document.getElementById("counter").innerText = `generations: ${generations}`;
}

function addRandom() {
  fillBoard();
}
function createBoard() {
  const board = document.querySelector("#board");

  board.style.setProperty("--GRID_HEIGHT", GRID_HEIGHT);
  board.style.setProperty("--GRID_WIDTH", GRID_WIDTH);

  for (let row = 0; row < GRID_HEIGHT; row++) {
    for (let col = 0; col < GRID_WIDTH; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      board.appendChild(cell);
    }
  }
}

function fillBoard() {
  for (let row = 0; row < GRID_HEIGHT; row++) {
    for (let col = 0; col < GRID_WIDTH; col++) {
      let isAlive;
      if (Math.random() < 0.15) {
        isAlive = 1;
      } else {
        isAlive = 0;
      }
      model[row][col] = isAlive;
    }
  }
  updateView();
}

function updateView() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell, index) => {
    const row = Math.floor(index / GRID_WIDTH);
    const col = index % GRID_WIDTH;
    cell.style.backgroundColor = model[row][col] === 1 ? "black" : "white";
  });
}

// ************* MODEL *************

function createModel() {
  for (let row = 0; row < GRID_HEIGHT; row++) {
    const newRow = [];
    for (let col = 0; col < GRID_WIDTH; col++) {
      newRow[col] = 0;
    }
    model[row] = newRow;
  }
}

function countNeighbours(row, col) {
  let count = 0;
  for (let y = -1; y <= 1; y++) {
    for (let x = -1; x <= 1; x++) {
      if (x === 0 && y === 0) continue; 
      const checkRow = row + y;
      const checkCol = col + x;
      count += readFromCell(checkRow, checkCol);
    }
  }
  return count;
}

function nextGeneration() {
  generations++;
  document.getElementById("counter").innerText = `generations: ${generations}`;
  const nextGenerationModel = model.map((row, rowIndex) => 
    row.map((cell, colIndex) => {
      const neighbours = countNeighbours(rowIndex, colIndex);
      if (cell === 1 && (neighbours < 2 || neighbours > 3)) return 0;
      if (cell === 0 && neighbours === 3) return 1;
      return cell;
    })
  );
  model = nextGenerationModel;
  updateView();
}

function writeToCell(row, col, value) {
  model[row][col] = value;
}

function readFromCell(row, col) {
  if (row < 0 || row >= GRID_HEIGHT || col < 0 || col >= GRID_WIDTH) return 0;

  return model[row][col];
}
