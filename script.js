const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const cells = [];
let currentTurn = "X";

const changeTurn = () => currentTurn = currentTurn=="X"?"O":"X";

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
        if (cells[Math.floor(i/3)][i%3] == " ")
            el.addEventListener('click', () => {
                cells[Math.floor(i/3)][i%3] = currentTurn;
                changeTurn();
                renderBoard();
            });
    });
}

const main = () => {
    populateCells();
}

addEventListener("DOMContentLoaded", main);