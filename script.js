const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

const statusDisplay = $('.game--status');

let gameActive = true;

let currentPlayer = 'X';

let gameState = ["","","","","","","","",""];

const winningCondition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


const winningMessage = () => {
     
Swal.fire({
    position: 'center',
    icon: 'success',
    title: `Player ${currentPlayer} has won!`,
    showConfirmButton: false,
    timer: 1500
  })

}

const drawMessage = () =>{
     
Swal.fire({
    position: 'top-end',
    icon: 'info',
    title: 'Game Ended in a Draw!',
    showConfirmButton: false,
    timer: 1500
  })
}

const currentPlayerTurn = ()=>{
    return `It's ${currentPlayer} Player's turn`;
}

statusDisplay.innerHTML = currentPlayerTurn();


//handles the cell played
function handleCellPlayed(clickedCell, clickedCellIndex){

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;  
    
}


//handles player change
function handlePlayerChange(){

    currentPlayer = currentPlayer === "X" ? "0" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();

}


//validate the winner 
function handleResultValidation(){
        let roundWon = false;

        for (var i =0; i<= 7; i++){
            const winCondition = winningCondition[i];
            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];

            if (a === '' || b==='' || c===''){
                    continue;
            }

            if (a===b && b===c){
                roundWon = true;
                break;
            }
        }

        if (roundWon){
            statusDisplay.textContent = winningMessage();
            gameActive = false;
            gameState = ["","","","","","","","",""];
            return;
        }

        let roundDraw = !gameState.includes("");
        if (roundDraw){
            statusDisplay.innerHTML = drawMessage();
            gameActive = false;
            return;
        }

        handlePlayerChange();


}

//handles the cell click

function handleCellClick(clickedCellEvent){
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
    if (gameState[clickedCellIndex] !== "" || !gameActive){
        return ;
    }

    handleCellPlayed(clickedCell,clickedCellIndex);
    handleResultValidation();

}

//button restart event

function handleRestartGame(){
    gameActive = true;
    currentPlayer = "X";
    gameState = ["","","","","","","","",""];
    statusDisplay.innerHTML = currentPlayerTurn();
    $$('.cell').forEach(cell => {
        cell.innerHTML = "";
    })
    

}

$$('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
$('.game--restart').addEventListener('click',handleRestartGame);