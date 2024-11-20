// Array to store the board's state (X, O, or empty)
let boardState = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';  // Player X starts the game
let gameOver = false;

// Function to handle click on each cell
function handleClick(cellId) {
    const cell = document.getElementById(cellId);
    const index = parseInt(cellId.split('-')[1]) - 1;

    if (gameOver || boardState[index] !== '') return; // Ignore if game is over or cell is already filled

    boardState[index] = currentPlayer;  // Mark the cell with the current player's symbol
    cell.textContent = currentPlayer;    // Display X or O in the cell

    if (checkWinner()) {
        document.getElementById('game-message').textContent = `${currentPlayer} wins!`;
        document.querySelector('.end').style.display = 'block';
        gameOver = true;
    } else if (boardState.every(cell => cell !== '')) {
        document.getElementById('game-message').textContent = "It's a tie!";
        document.querySelector('.end').style.display = 'block';
        gameOver = true;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';  // Switch player
    }
}

// Function to check for a winner
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winPatterns.some(pattern => {
        return boardState[pattern[0]] === currentPlayer &&
               boardState[pattern[1]] === currentPlayer &&
               boardState[pattern[2]] === currentPlayer;
    });
}

// Function to restart the game
function restartGame() {
    boardState = ['', '', '', '', '', '', '', '', '']; // Reset board state
    currentPlayer = 'X';  // Player X starts again
    gameOver = false;     // Game is not over anymore
    document.querySelector('.end').style.display = 'none'; // Hide the end message
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.textContent = ''); // Clear the board

    // Ensure no cells are marked
    for (let i = 0; i < boardState.length; i++) {
        boardState[i] = '';
    }
}

for (let i = 1; i <= 9; i++) {
    const cell = document.getElementById(`cell-${i}`);
    cell.addEventListener('click', () => handleClick(`cell-${i}`));
}
