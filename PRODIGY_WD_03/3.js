let currentPlayer = '';
let player1 = '';
let player2 = '';
let board = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

const boardContainer = document.getElementById('boardContainer');
const myForm = document.getElementById('myForm');
const result = document.getElementById('result')
const turn = document.getElementById('turn')
const audio = new Audio('sound.mp3')

myForm.addEventListener('submit', (e) => {
    e.preventDefault()
    boardContainer.style.display = "block";
    myForm.style.display = "none";
    player1 = document.getElementById('player1').value;
    player2 = document.getElementById('player2').value;
    currentPlayer = 'X';
    updateTurn();
})

function updateTurn() {
    turn.innerText = `Turn: ${currentPlayer === 'X' ? player1 : player2}`;
}

function playerMove(cellIndex) {
   
    if (!currentPlayer || isGameOver()) {
        return; 
    }
    audio.play()

    if (currentPlayer && board[cellIndex] === '') {
        board[cellIndex] = currentPlayer;
        document.getElementsByClassName('cell')[cellIndex].innerText = currentPlayer;
        if (isGameOver()) {
            result.innerText = `Player ${currentPlayer === 'X' ? player1 : player2} wins!`
            turn.innerText = ""
        } else if (!board.includes('')) {
            result.innerText = "It's a draw!"
            turn.innerText = ""
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateTurn();
        }
    }
}

function isGameOver() {
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

function resetGame() {
    currentPlayer = '';
    player1 = '';
    player2 = '';
    board = ['', '', '', '', '', '', '', '', ''];
    const cells = document.getElementsByClassName('cell');
    for (let cell of cells) {
        cell.innerText = '';
    }
    document.getElementById('player1').value = '';
    document.getElementById('player2').value = '';
    turn.innerText = '';
    result.innerText = '';
    boardContainer.style.display = "none";
    myForm.style.display = "flex";
}

function refreshBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
    const cells = document.getElementsByClassName('cell');
    for (let cell of cells) {
        cell.innerText = '';
    }
    result.innerText = ''
    turn.innerText = ''
}