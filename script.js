"use strict";

window.addEventListener("load", start);

// ************* CONTROLLER *************

function start() {
  console.log("JS running.");
  makeBoardClickable();
}

function selectCell(row, col) {
  writeToCell(row, col, 1);
  displayBoard();
}

// ************* VIEW *************
function makeBoardClickable() {
  document.querySelector("#board").addEventListener("click", boardClicked);
}

function boardClicked(event) {
  console.log("Board clicked");

  const cell = event.target;

  if (cell.classList.contains("cell")) {
    const row = cell.dataset.row;
    const col = cell.dataset.col;

    console.log(`Clicked row ${row}, col ${col}`);
    selectCell(row, col);
  }
}
function displayBoard() {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const value = readFromCell(row, col);
      const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);

      switch (value) {
        case 0:
          cell.textContent = "";
          break;
        case 1:
          cell.textContent = "X";
          break;
        case 2:
          cell.textContent = "O";
          break;
      }
    }
  }
}

// ************* MODEL *************
const model = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

function writeToCell(row, col, value) {
  model[row][col] = value;
}
function readFromCell(row, col) {
  return model[row][col];
}
