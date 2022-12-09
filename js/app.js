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
console.log(boardEl)
/*----------------------------- Event Listeners -----------------------------*/
boardEl.addEventListener('click',handleClick)


/*-------------------------------- Functions --------------------------------*/

function init(){
  console.log('App fired up')
  //Fill board with null
  board.fill(null)
  //board = [1, -1, 1, 1, -1, 1, -1, -1, 0]

  //console.log(board)
  turn = -1 //Multiply by -1 to change turn(might need a function to do it?)
  winner = false //No winner at the beginning(set function?)
  tie = false // Tie condition ,true when no null in board(funciton?)
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
  console.log(board)
}

function updateMessage(){
  if(!winner && !tie){
    messageEl.textContent = `It is player ${turn} turn!`
  }else if(!winner && tie){
    messageEl.textContent = `It is a tie game!`
  }else {
    messageEl.textContent = `Congratulations, player ${turn} wins!`
  }
}

function handleClick (event){
  let sqIdx 
  let sqId = event.target.getAttribute('id')
  if (sqId != null){
    sqIdx = parseInt(sqId.slice(2))
  }

  if (board[sqIdx] || winner){
    return
  }
  placePiece(sqIdx)
  checkForTie()
  checkForWinner()
  switchPlayerTurn()
  render()
  //console.log(sqIdx)
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
checkForWinner()
// Step 1 - Define the required variables used to track the state of the game

  // 1a) Use a variable named `board` to represent the state of the squares on
  //     the board.

  // 1b) Use a variable named `turn` to track whose turn it is.

  // 1c) Use a variable named `winner` to represent if anyone has won yet.

  // 1d) Use a variable named `tie` to represent if the game has ended in a tie.


// Step 2 - Store cached element references.

  // 2a) In a constant called `squareEls`, store the nine elements 
  //    representing the squares on the page.

  // 2b) In a constant called `messageEl`, store the element that displays the 
  //    game's status on the page.


// Step 3 - Upon loading, the game state should be initialized, and a function 
//          should be called to render this game state.

  // 3a) Create a function called `init`.

  // 3b) Call this `init` function when the app loads.
  
  // 3c) Set the `board` variable to an array containing nine `null`s to 
  //    represent empty squares.

  // 3d) Set the `turn` to `1` - which will represent player X.

  // 3e) Set the `winner` to false.

  // 3f) Set `tie` to false.

  // 3g) Call a function called `render` at the end of the `init` function.


// Step 4 - The state of the game should be rendered to the user

  // 4a) Create a function called `render`, then set it aside for now.

  // 4b) Create a function called `updateBoard`.

  // 4c) In the `updateBoard` function, loop over `board` and for each element:
  //     - Use the current index of the iteration to access the corresponding 
  //       square in the `squareEls` array.
  //     - Style that square however you wish, dependent on the value  
  //       contained in the current cell being iterated over (`-1`, `1`, or
  //       `null`). To keep it simple, start with just putting a letter in 
  //       each square depending on what the the value of each cell is.

  // 4d) Create a function called `updateMessage`
  
  // 4e) In the `updateMessage` function, render a message based on the 
  //     current game state:
  //     - If both `winner` and `tie` have a value of false (meaning the game 
  //       is still in progress), render whose turn it is.
  //     - If `winner` is false, but `tie` is true, render a tie message.
  //     - Otherwise, render a congratulatory message to the player that has 
  //       won.

  // 4f) Invoke both the `updateBoard` and the `updateMessage` functions
  //     inside of your `render` function.

// Step 5 - Define the required constants

  // 5a) In a constant called `winningCombos` define the eight possible winning 
  //     combinations as an array of arrays.


// Step 6 - Handle a player clicking a square with a `handleClick` function

  // 6a) Create a function called `handleClick`. It will have an `evt`
  //     parameter.

  // 6b) Attach an event listener to the game board (you can do this to each
  //     one of the existing `squareEls` with a `forEach` loop OR add a new
  //     cached element reference that will allow you to take advantage of 
  //     event bubbling). On the `'click'` event, it should call the 
  //    `handleClick` function you created in 6a.

  // 6c) Obtain the index of the square that was clicked by "extracting" the 
  //     index from an `id` assigned to the target element in the HTML. Assign 
  //     this to a constant called `sqIdx`.

  // 6d) If the `board` has a value at the `sqIdx`, immediately `return`  
  //     because that square is already taken. Also, if `winner` is not `null`
  //     immediately `return` because the game is over.


// Step 6.1 - `placePiece`

  // 6.1a) Create a function named placePiece that accepts an `idx` parameter.

  // 6.1b) Update the `board` array at the `idx` so that it is equal to the 
  //       current value of `turn`.


// 6.2 - `checkForTie`

  // 6.2a) Create a function named `checkForTie`.

  // 6.2b) Check if the `board` array still contains any `null` elements. If
  //       it does, we can leave `tie` as false. Otherwise, set `tie` to true.


// 6.3 - `checkForWinner`

  // 6.3a) Create a function called `checkForWinner`

  // 6.3b) Determine if a player has won using one of the two options below.
  //       Option 1 is a more elegant method that takes advantage of the 
  //       `winningCombos` array you wrote above in step 5. Option 2 might 
  //       be a little simpler to comprehend, but you'll need to write more 
  //       code. This option won't take advantage of the winningCombos array, 
  //       but using it as a reference will help you build a solution.
  //       Ensure you choose only one path.

  //       Option 1) Loop through each of the winning combination arrays 
  //       defined in the `winningCombos` array. Total up the three board 
  //       positions using the three indexes in the current combo. Convert 
  //       the total to an absolute value (convert any negative total to 
  //       positive). If the total equals 3, we have a winner, and can set 
  //       `winner` to true.

  //       Option 2) For each one of the winning combinations you wrote in 
  //       step 5, find the total of each winning combination. Convert the 
  //       total to an absolute value (convert any negative total to 
  //       positive). If the total equals 3, we have a winner, and can set 
  //       `winner` to true.


// 6.4 - `switchPlayerTurn`

  // 6.4a) Create a function called `switchPlayerTurn`.

  // 6.4b) If `winner` is true, return out of the function - we don’t need 
  //       to switch the turn anymore!

  // 6.4c) If `winner` is false, change the turn by multiplying `turn` by 
  //       `-1` (this flips a `1` to `-1`, and vice-versa).


// 6.5 - Tying it all together

  // 6.5a) In our `handleClick` function, call `placePiece`, `checkForTie`, 
  //       `checkForWinner`, and `switchPlayerTurn`. Don’t forget that 
  //       `placePiece` needs `sqIdx` as an argument! 

  // 6.5b) Finally, now that all the state has been updated we need to 
  //       render that updated state to the user by calling the `render` 
  //       function that we wrote earlier.

// Step 7 - Create Reset functionality

  // 7a) Add a reset button to the HTML document.

  // 7b) Store the new reset button element as a cached element reference in
  //     a constant named `resetBtnEl`.

  // 7c) Attach an event listener to the `resetBtnEl`. On the `'click'` event 
  //     it should call the `init` function you created in step 3.