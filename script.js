// "use strict";

window.addEventListener("load", start);

const GRID_WIDTH = 40;
const GRID_HEIGHT = 25;
let model = [];
// ************* CONTROLLER *************

function start() {
  console.log("JS running.");
  createModel();
  createBoard();
  fillBoardv2();

}



// ************* VIEW *************

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

function fillBoardv2() {
  for (let row = 0; row < GRID_HEIGHT; row++) {
    for (let col = 0; col < GRID_WIDTH; col++) {
      const isAlive = Math.random() > 0.15 ? 1 : 0;
      model[row][col] = isAlive;
    }
  }
  updateView();
}

function fillBoard() {
  // change data value to 1 or 0
  const cells = document.querySelectorAll(".cell");
  cells.forEach(cell => {
    let dead_alive = cell.dataset.dead_alive = Math.round(Math.random());
    cell.setAttribute("dead_alive", dead_alive);
    if (dead_alive === 1) {
      cell.style.backgroundColor = "black";
    }
    // iterate through the grid
    for (let row = 0; row < GRID_HEIGHT; row++) {
      for (let col = 0; col < GRID_WIDTH; col++) {
        if (Math.random() < 0.15) {
          dead_alive = 1;
        } else {
          dead_alive = 0;
        }
      }
    }
  });
}


function updateView() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell, index) => {
    const row = Math.floor(index / GRID_WIDTH);
    const col = index % GRID_WIDTH;
    cell.style.backgroundColor = model[row][col] === 1 ? "white" : "black";
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
      //avoid counting the cell itself
      if (x != 0 && y != 0) {
        count += readFromCell(row + y, col + x);
      }
    }
  }
}

function nextGeneration() {
  const nextGeneration = model.map(row, rowIndex => row.map((cell, colIndex) => {
    const neighbours = countNeighbours(rowIndex, colIndex);
    if (cell === 1 && (neighbours < 2 || neighbours > 3)) return 0;
    if (cell === 0 && neighbours === 3) return 1;
    return cell;
  }));
  model = nextGeneration;
  updateView();
}



function writeToCell(row, col, value) {
  model[row][col] = value;
}

function readFromCell(row, col) {
  if (row < 0 || row >= GRID_HEIGHT || col < 0 || col >= GRID_WIDTH) return 0;

  return model[row][col];
}