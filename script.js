// "use strict";

window.addEventListener("load", start);

const GRID_WIDTH = 40;
const GRID_HEIGHT = 25;

// ************* CONTROLLER *************

function start() {
  console.log("JS running.");
  createBoard();
  // createModel();
}

function fillBoard() {
  // change data value to 1 or 0
  const cells = document.querySelectorAll(".cell");
  cells.forEach(cell => {
    const dead_alive = cell.dataset.dead_alive = Math.round(Math.random());
    cell.setAttribute("dead_alive", dead_alive ? "1" : "0");
  });

  // iterate through the grid
  for (let row = 0; row < GRID_HEIGHT; row++) {
    for (let col = 0; col < GRID_WIDTH; col++) {
      if(Math.random() < 0.15) {
        writeToCell(row, col, 1); 
      } else {
        writeToCell(row, col, 0);
      }
    }
  }
}

function changeCell(){
  const cell = document.querySelector(".cell");
  

}

function nextGeneration() {

}


function countNeighbours(row, col) {
  let count = 0;
  for(let y = -1; y <= 1; y++) {
    for(let x = -1; x <=1; x++) {
      //avoid counting the cell itself
      if(x != 0 && y!= 0) {
        count += readFromCell(row + y, col + x);
      }
    }
  }
}



// ************* VIEW *************

function createBoard() {
  const board = document.querySelector("#board");

  board.style.setProperty("--GRID_HEIGHT", GRID_HEIGHT);
  board.style.setProperty("--GRID_WIDTH", GRID_WIDTH);


  for (let row= 0; row < GRID_HEIGHT; row++) {
    for (let col = 0; col < GRID_WIDTH; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      board.appendChild(cell);
    }
  }
}

// ************* MODEL *************

function writeToCell(row, col, value) {
  model[row][col] = value;
}

function readFromCell(row, col) {
  return model[row][col];
}

// function selectCell(row, col) {
//   writeToCell(row, col, 1);
//   displayBoard();
// }

// const model = [
//   [0, 0, 0],
//   [0, 0, 0],
//   [0, 0, 0],
// ];




// function createModel() {
//   for (let row = 0; row < GRID_HEIGHT; row++) {
//     const newRow= [];
//     for (let col = 0; col < GRID_WIDTH; col++) {
//       newRow[col] = 0;
//     }
//     model[row] = newRow;
//   }
// }

// function makeBoardClickable() {
//   document.querySelector("#board").addEventListener("click", boardClicked);
// }

// function boardClicked(event) {
//   console.log("Board clicked");

//   const cell = event.target;

//   if (cell.classList.contains("cell")) {
//     const row = cell.dataset.row;
//     const col = cell.dataset.col;

//     console.log(`Clicked row ${row}, col ${col}`);
//     selectCell(row, col);
//   }
// }
// function displayBoard() {
//   for (let row = 0; row < 3; row++) {
//     for (let col = 0; col < 3; col++) {
//       const value = readFromCell(row, col);
//       const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);

//       switch (value) {
//         case 0:
//           cell.textContent = "";
//           break;
//         case 1:
//           cell.textContent = "X";
//           break;
//         case 2:
//           cell.textContent = "O";
//           break;
//       }
//     }
//   }
// }
