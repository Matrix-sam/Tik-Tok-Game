/**
* This program is a boilerplate code for the standard tic tac toe game
* Here the “box” represents one placeholder for either a “X” or a “0”
* We have a 2D array to represent the arrangement of X or O is a grid
* 0 -> empty box
* 1 -> box with X
* 2 -> box with O
*
* Below are the tasks which needs to be completed:
* Imagine you are playing with the computer so every alternate move should be done by the computer
* X -> player
* O -> Computer
*
* Winner needs to be decided and has to be flashed
*
* Extra points will be given for approaching the problem more creatively
* 
*/

const grid = [];
const GRID_LENGTH = 3;
let turn = 1;

function initializeGrid() {
    for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH; rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';

    for (let rowIdx = 0; rowIdx < GRID_LENGTH; rowIdx++) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum % 2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if (gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="' + colIdx + '" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    let value = grid[colIdx][rowIdx];
    if (value !== 0) {
        return
    }
    grid[colIdx][rowIdx] = turn;
    let result = Winner(turn);
    let win = (turn === 1) ? 'X' : 'O';
    if (result) {
        // alert(win + " wins!");
        document.getElementById('result').innerHTML = "&nbsp;" + win + " wins!";
        setTimeout(function () {
            location.reload()
        }, 2000)
    }
    turn = (turn === 1) ? 2 : 1;
    renderMainGrid();
    addClickHandlers();
}

function Winner(_turn) {
    let total = {
        sum1: 0,
        sum2: 0,
        horizontal: {},
        variation: {}
    }
    let _count1 = 0, _count2 = 0;
    for (var i = 0; i < 3; i++) {
        var sum = 0, count = 0;
        for (var j = 0; j < 3; j++) {
            if (grid[i][j] !== 0) {
                if (i === j) {
                    total['sum1'] = total['sum1'] + grid[i][j];
                    _count1++;
                }
                if (i === 0 && j === 2 || i === 2 && j === 0 || i === 1 && j === 1) {
                    total['sum2'] = total['sum2'] + grid[i][j];
                    _count2++;
                }
                ++count;
                sum += grid[i][j];
                if (count === 3 && sum === _turn * 3) {
                    return true;
                }
                if (total['variation'].hasOwnProperty(j)) {
                    let arr = total['variation'][j];
                    arr.push(grid[i][j]);
                    total['variation'][j] = arr;
                } else {
                    total['variation'][j] = [grid[i][j]];
                }
            }
        }

    }
    if (total['sum1'] === _turn * 3 && _count1 === 3) {
        return true;
    }
    if (total['sum2'] === _turn * 3 && _count2 === 3) {
        return true;
    }

    let keys = Object.keys(total['variation']);
    for (var i = 0; i < keys.length; i++) {
        let indexData = total['variation'][keys[i]];
        if (indexData.length === 3) {
            let sum = indexData.reduce(add, 0);
            if (sum === _turn * 3) {
                return true;
            }
        }
    }
}

function add(a, b) {
    return a + b;
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}


initializeGrid();
renderMainGrid();
addClickHandlers();
