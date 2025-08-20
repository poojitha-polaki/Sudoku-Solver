var arr = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
        arr[i][j] = document.getElementById(i * 9 + j);

    }
}


var board = Array.from({ length: 9 }, () => Array(9).fill(0));

function FillBoard(board) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] != 0) {
                arr[i][j].innerText = board[i][j]
            }

            else
                arr[i][j].innerText = ''
        }
    }
}

let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')

GetPuzzle.onclick = function () {
    fetch('https://sugoku.onrender.com/board?difficulty=easy')
        .then(res => res.json())
        .then(response => {
            console.log("Fetched board:", response);
            board = response.board;
            FillBoard(board);
        })
        .catch(err => console.error("Error fetching puzzle:", err));
};


// GetPuzzle.onclick = function () {
//     var xhrRequest = new XMLHttpRequest()
//     xhrRequest.onload = function () {
//         var response = JSON.parse(xhrRequest.response)
//         console.log(response)
//          board = response.board
//         FillBoard(board)
//     }
//     xhrRequest.open('get', 'https://sugoku.onrender.com/board?difficulty=easy')
//     //we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
//     xhrRequest.send()
// }

SolvePuzzle.onclick = () => {
    SudokuSolver(board, 0, 0, 9);
};
function isSafe(board, row, col, digit) {
        //horizontal row check
        for (let i = 0; i < 9; i++) {
            if (board[row][i] == digit) {
                return false;
            }
        }
        //vertical col check
        for (let j = 0; j < 9; j++) {
            if (board[j][col] == digit) {
                return false;
            }
        }
        //sub grid check
        let grow = Math.floor(row / 3) * 3;
        let gcol = Math.floor(col / 3) * 3;

        for (let i = grow; i <= grow + 2; i++) {
            for (let j = gcol; j <= gcol + 2; j++) {
                if (board[i][j] == digit) {
                    return false;
                }
            }
        }
        return true;
    }
    function sudokuSolver(board, row, col, n) {
            //base case
            if (row == 9) {
                FillBoard(board);
                return true;
                //sudoku is filled
            }
            let nextRow = row, nextCol = col + 1;

            if (nextCol == 9) {
                nextRow = row + 1;
                nextCol = 0;
            }

            if (board[row][col] != 0) {
                return sudokuSolver(board, nextRow, nextCol, n);
            }
            for (let digit = 1; digit <= 9; digit++) {
                if (isSafe(board, row, col, digit)) {
                    board[row][col] = digit;
                    let ans = sudokuSolver(board, nextRow, nextCol, n);
                    if (ans) {
                        return true;
                    }
                    board[row][col] = 0;
                }
            }
            return false;
        }
function SudokuSolver(board, i, j, n) { 
        sudokuSolver(board, i, j, n);
    }
