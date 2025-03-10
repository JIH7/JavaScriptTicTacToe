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
            markup += `<td class="${cells[y][x]} ${x == 0 ? "left" : ""} ${x== 2 ? "right" : ""} ${y == 0 ? "top" : ""} ${y == 2 ? "bottom" : ""}">${cell}</td>`;
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
            return;
        }
    }

    cells.forEach((row, y) => {
        if (row.every(cell => cell != " " && cell == row[0])) {
            endGame(row[0], [y, 0], [y, 2]);
            return;
        }
    })

    for (let x = 0; x < 3; x++) {
        if (cells[0][x] != " ") {
            if (cells[1][x] == cells[0][x] && cells[2][x] == cells[0][x]) {
                endGame(cells[0][x], [0, x], [2, x]);
                return;
            }
        }
    }

    if (!cells.some(row => {
         return row.some(cell => cell == " ");
    })) {
        endGame();
    }
}

const endGame = (winner, start, end) => {
    if (!winner) {
        $("body").innerHTML += `<h2>Tied game</h2><span class="tie-c">C</span>`;
        $("button").addEventListener("click", () => location.reload());
        return;
    }

    $("body").innerHTML += `<h2><span class="${winner}">${winner}</span> wins!</h2>`;
    const cellElements = $$("td");
    // Draw a line through the winning
    connect(cellElements[start[0]*3 + start[1]], cellElements[end[0]*3 + end[1]]);
    $("button").addEventListener("click", () => location.reload());
}

const getOffset = (el) => {
    let rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.pageXOffset,
        top: rect.top + window.pageYOffset,
        width: rect.width || el.offsetWidth,
        height: rect.height || el.offsetHeight
    };
}

const connect = (cell1, cell2) => { 
    let off1 = getOffset(cell1);
    let off2 = getOffset(cell2);
    // Bottom right of line
    let x1 = off1.left + off1.width / 2;
    let y1 = off1.top + off1.height / 2;
    // Top right of line
    let x2 = off2.left + off2.width / 2;
    let y2 = off2.top + off2.height / 2;
    // Line length
    let length = Math.sqrt(((x2-x1) * (x2-x1)) + ((y2-y1) * (y2-y1)));
    // Center of line
    let cx = ((x1 + x2) / 2) - (length / 2);
    let cy = ((y1 + y2) / 2) - (3 / 2);
    // Calculate angle
    let angle = Math.atan2((y1-y2),(x1-x2))*(180/Math.PI);
    // Create line element
    let lineMarkup = `<div style='padding:0px; margin:0px; height:3px; background-color:white; line-height:1px; position:absolute; left:${cx}px; top:${cy}px; width:${length}px; -moz-transform:rotate(${angle}deg); -webkit-transform:rotate(${angle}deg); -o-transform:rotate(${angle}deg); -ms-transform:rotate(${angle}deg); transform:rotate(${angle}deg);' />`;
    // Append to document
    document.body.innerHTML += lineMarkup;
}

const main = () => {
    populateCells();
    $("button").addEventListener("click", () => location.reload());
}

addEventListener("DOMContentLoaded", main);