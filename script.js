// querySelector shortcuts
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
// 2D array of grid cells
const cells = [];
let currentTurn = "X";
// Toggle next character to place
const changeTurn = () => currentTurn = currentTurn=="X"?"O":"X";

// Create initial empty grid
const populateCells = () => {
    for (let y = 0; y < 3; y++) {
        cells.push([]);
        for (let x = 0; x < 3; x++) {
            cells[y].push(" ");
        }
    }
    console.log(cells);
    renderBoard();
}

// Creates HTML elements and eventListeners for every cell
const renderBoard = () => {
    const board = $("#board");
    let markup = "";
    cells.forEach((row, y) => {
        markup += "<tr>";
        row.forEach((cell, x) => {
            markup += `<td>${cell}</td>`;
        })
        markup += "</tr>";
    })
    board.innerHTML = markup;

    cellElements = $$("td");
    cellElements.forEach((el, i) => {
        if (cells[Math.floor(i/3)][i%3] == " ") // Only add evenListener's for empty cells
            el.addEventListener('click', () => {
                cells[Math.floor(i/3)][i%3] = currentTurn;
                changeTurn();
                checkGameOver();
                renderBoard();
            });
    });
}

const checkGameOver = () => {

    if (cells[0][0] != " ") {
        if (cells[1][1] == cells [0][0] && cells[2][2] == cells[0][0]) {
            endGame(cells[0][0], [0, 0], [2, 2]);
            return;
        }
    }
    if (cells[2][0] != " ") {
        if (cells[1][1] == cells[2][0] && cells[0][2] == cells[2][0]){
            endGame(cells[2][0], [2, 0], [0, 2]);
        }
    }

    cells.forEach((row, y) => {
        if (row.every(cell => cell != " " && cell == row[0])) {
            endGame(row[0], [y, 0], [y, 2]);
        }
    })

    for (let x = 0; x < 3; x++) {
        if (cells[0][x] != " ") {
            if (cells[1][x] == cells[0][x] && cells[2][x] == cells[0][x]) {
                endGame(cells[0][x], [0, x], [2, x]);
            }
        }
    }

    return false;
}

const endGame = (winner, start, end) => {
    console.log(`${winner} wins!`);
    $("body").innerHTML += `<h2>${winner} wins!</h2>`
}

const main = () => {
    populateCells();
}

addEventListener("DOMContentLoaded", main);