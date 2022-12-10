/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
[0,1,2],[3,4,5],[6,7,9],[0,3,6],
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
  //console.log('App fired up')
  //Fill board with null
  board.fill(null)
  //board = [1, -1, 1, 1, -1, 1, -1, -1, 0]

  //console.log(board)
  turn = -1 //Multiply by -1 to change turn(might need a function to do it?)
  winner = false //No winner at the beginning(set function?)
  tie = false // Tie condition ,true when no null in board(funciton?)
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
  //console.log(board)
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
  placePiece(sqIdx)
  checkForTie()
  checkForWinner()
  switchPlayerTurn()
  render()
  //console.log(sqIdx)
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
