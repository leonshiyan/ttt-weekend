/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
[0,1,2],[3,4,5],[6,7,8],[0,3,6],
[1,4,7],[2,5,8],[0,4,8],[2,4,6],
]



/*---------------------------- Variables (state) ----------------------------*/
let turn,winner,tie
let board = new Array(9)


/*------------------------ Cached Element References ------------------------*/
const squareEles = document.querySelectorAll('.sqr')
const messageEl = document.getElementById('message')
const boardEl = document.querySelector('.board')
const resetBtnEl = document.querySelector('.reset-button')
//console.log(resetBtnEl)
/*----------------------------- Event Listeners -----------------------------*/
boardEl.addEventListener('click',handleClick)
resetBtnEl.addEventListener('click',init)
boardEl.addEventListener('animationend', handleAnimationEnd, {once: false});

/*-------------------------------- Functions --------------------------------*/

function init(){

  board.fill(null)

  turn = -1 
  winner = false 
  tie = false 
  messageEl.classList.remove('animate__animated','animate__flip')
  render()
}

function updateBoard(){
  for (let i = 0; i < board.length; i++) {
    if(board[i]=== 1){
      squareEles[i].textContent = 'X'
    }else if(board[i] === -1){
      squareEles[i].textContent = 'O'
    }else{
      squareEles[i].textContent = ''
    }
  }
}

function updateMessage(){
  const playerMsg = turn == 1? 'X':'O'
  if(!winner && !tie){
    messageEl.textContent = `It is player ${playerMsg} turn!`
  }else if(!winner && tie){
    messageEl.textContent = `It is a tie game!`
  }else {
    messageEl.textContent = `Congratulations, player ${playerMsg} wins!`
    messageEl.classList.add('animate__animated','animate__flip')
  }
}

function handleClick (event){
  let sqIdx 
  let sqId = event.target.getAttribute('id')
  if (sqId != null){
    sqIdx = parseInt(sqId.slice(2))
  }
  if (board[sqIdx] || winner){
    boardAnimation(event)
    return
  }
  playerMove(sqIdx)
  setTimeout(() => {
    computerMove()
  }, 300)
  
}

//Add AI movement
  //  -AI is X (1) at current state
  //  -happens only after player click
  //  -find an empty spot to place ,no winning prevention
  //  -no move if there is a winner and or tie game
function computerMove(){
  if(!winner && !tie){
    let computerIdx = chooseEmptySpot()
  playerMove(computerIdx)
  }
}

function chooseEmptySpot(){
  let moves = []
  for (let index = 0; index < board.length; index++) {
    if(board[index]===null) moves.push(index)
  }
  //Select a move
  let move = moves[Math.floor(Math.random() * moves.length)]
  return move
}

function playerMove(sqIdx){
  placePiece(sqIdx)
  checkForTie()
  checkForWinner()
  switchPlayerTurn()
  render()
}

function boardAnimation(event){
  boardEl.classList.add('animate__animated','animate__headShake')
}
function handleAnimationEnd(event){
  event.stopPropagation();
  boardEl.classList.remove('animate__animated','animate__headShake');
  console.log('animation ended')
}
function placePiece(idx){
  board[idx] = turn
}

function checkForTie(){
  if(!board.includes(null)) tie = true
}

function checkForWinner(){
  let result
  for(combo of winningCombos){
    result = Math.abs(board[combo[0]] + board[combo[1]] + board[combo[2]])
    if (result === 3){
      winner = true
      return
    }
  }
}

function switchPlayerTurn(){
  if(winner){
    return
  }else{
    turn *= -1
  }
}



function render(){
  updateBoard()
  updateMessage()
}

/*-------------------------------- Game init --------------------------------*/
init()
