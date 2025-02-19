/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

/*---------------------------- Variables (state) ----------------------------*/

let board = ['','','','','','','','',''];
let turn = "X"; 
let winner = false;
let tie = false; 
//true means that the board array contains no more empty strings ('') 
//will be used to render a tie message if winner is still false by the time all squares are played.



/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.getElementById('message');
// console.log(messageEl);

const boardClick = document.querySelector('.board');
const resetBtnEl = document.getElementById('reset');

/*-------------------------------- Functions --------------------------------*/

function render() {
    updateBoard()
    updateMessage()
};

function updateBoard() {
    for (let el = 0; el < board.length; el++ ){
        squareEls[el].textContent = board[el];
    } 
}

function updateMessage() {
    if (!winner && !tie ) {
        messageEl.textContent = `It is ${turn} 's turn!`;
    } else if (!winner && tie) {
        messageEl.textContent = "Tied!";
    } else {
        messageEl.textContent = `Congrats! ${turn} wins!`;
    }
}

function init(){
    board = ['','','','','','','','',''];
    turn = "X"; 
    winner = false; 
    tie = false; 

    render();
};


function placePiece(idx) {
    board[idx] = turn;
    console.log(board);
};

function checkForWinner(){
    for (let i = 0; i < winningCombos.length; i++){
        let [a,b,c] = winningCombos[i];
        if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]){
            winner = true;
            return;
        }
    }
}

function checkForTie() {
    if (winner) return; 
    if (board.includes('')) {
        tie = false;
    } else {
        tie = true;
    }
    // console.log(tie);
}

function switchPlayerTurn() {
    if (winner) return;
    turn = turn === "X" ? "O" : "X"; 
};

function handleClick(event) {
    if (!event.target.classList.contains('sqr')) return;
    const squareIndex = parseInt(event.target.id)

    if (board[squareIndex] === 'X' || board[squareIndex] === 'O' || winner){
        return;
    }
    placePiece(squareIndex); // place the piece on the board;
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();
};

/*----------------------------- Event Listeners -----------------------------*/


boardClick.addEventListener('click', handleClick);
resetBtnEl.addEventListener('click', init);

//1) Define the required variables used to track the state of the game.

//2) Store cached element references.

//3) Upon loading, the game state should be initialized, and a function should 
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player clicking a square with a `handleClick` function.

//7) Create Reset functionality.
